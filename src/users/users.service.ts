import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./models/user.model";
import { hash, compare } from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import * as uuid from "uuid";
import { Response, Request } from "express";
import { UserSignInDto } from "./dto/user-signIn.dto";
import { MailService } from "../mail/mail.service";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService
  ) {}
  async generateTokens(user: User) {
    const payload = {
      id: user.id,
      is_active: user.is_active,
      is_owner: user.is_owner,
    };
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return { access_token, refresh_token };
  }

  async signUp(createUserDto: CreateUserDto, res: Response) {
    const user = await this.userModel.findOne({
      where: { email: createUserDto.email },
    });
    if (user) {
      throw new BadRequestException("This user already exists");
    }
    if (createUserDto.password != createUserDto.confirm_password) {
      throw new BadRequestException("Passwords do not match");
    }
    const hashed_password = await hash(createUserDto.password, 7);
    const newUser = await this.userModel.create({
      ...createUserDto,
      hashed_password,
    });
    const { access_token, refresh_token } = await this.generateTokens(newUser);
    const hashed_refresh_token = await hash(refresh_token, 7);
    const activation_link = uuid.v4();

    const updatedUser = await this.userModel.update(
      {
        hashed_refresh_token,
        activation_link,
      },
      { where: { id: newUser.id }, returning: true }
    );
    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
      maxAge: Number(process.env.REFRESH_TIME_MS),
    });
    try {
      this.mailService.sendMail(updatedUser[1][0]);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException("Error sending activation email");
    }
    const response = {
      message: "User registred successfully",
      Sms: "Activation link sent to your email",
      accessToken: access_token,
    };
    return response;
  }

  async signIn(userSignInDto: UserSignInDto, res: Response) {
    const user = await this.userModel.findOne({
      where: { email: userSignInDto.email },
    });

    if (!user) {
      throw new UnauthorizedException("Incorrect email or password");
    }
    const validPassword = await compare(
      userSignInDto.password,
      user.hashed_password
    );
    if (!validPassword) {
      throw new UnauthorizedException("Incorrect email or password");
    }
    const { access_token, refresh_token } = await this.generateTokens(user);

    const hashed_refresh_token = await hash(refresh_token, 7);
    user.hashed_refresh_token = hashed_refresh_token;
    await user.save();
    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
      maxAge: +process.env.REFRESH_TIME_MS,
    });

    const response = {
      message: "User signed in successfully",
      userId: user.id,
      accesToken: access_token,
    };
    return response;
  }

  async signOut(req: Request, res: Response) {
    const { refresh_token } = req.cookies;
    if (!refresh_token) {
      throw new NotFoundException("Refresh token not found nn cookies");
    }
    const decodedToken = await this.jwtService.verify(refresh_token, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    if (!decodedToken) {
      throw new NotFoundException("User not found");
    }

    const user = await this.userModel.update(
      {
        hashed_refresh_token: null,
      },
      { where: { id: decodedToken.id } }
    );
    if (!user) {
      throw new NotFoundException("this is not defined");
    }
    res.clearCookie("refresh_token");
    return {
      message: "User sing out successfully",
    };
  }

  async userRefreshToken(req: Request, res: Response) {
    try {
      const { refresh_token } = req.cookies;

      if (!refresh_token) {
        throw new NotFoundException("Refresh token not found in Cookie");
      }
      const decodedToken = await this.jwtService.verify(refresh_token, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });
      if (!decodedToken) {
        throw new UnauthorizedException("Invalid refresh token");
      }
      const user = await this.userModel.findByPk(decodedToken.id);
      if (!user) {
        throw new NotFoundException("User not found");
      }

      const tokens = await this.generateTokens(user);
      res.cookie("refresh_token", tokens.refresh_token, {
        httpOnly: true,
        maxAge: +process.env.REFRESH_TIME_MS,
      });
      user.hashed_refresh_token = await hash(tokens.refresh_token, 7);

      user.save();
      const response = {
        message: "Token refreshed successfully",
        accessToken: tokens.access_token,
      };
      return response;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async userActivate(req: Request, res: Response) {
    const link = req.params.link;

    const user = await this.userModel.findOne({
      where: { activation_link: link },
    });
    if (!user) {
      throw new NotFoundException("User not found");
    }
    if (user.is_active) {
      throw new BadRequestException("User is already active");
    }
    user.is_active = true;
    await user.save();
    return {
      message: "User activated successfully",
      is_active: user.is_active,
    };
  }

  findAll() {
    return this.userModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.userModel.findByPk(id, { include: { all: true } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userModel.update(updateUserDto, { where: { id } });
  }

  remove(id: number) {
    return this.userModel.destroy({ where: { id } });
  }
}
