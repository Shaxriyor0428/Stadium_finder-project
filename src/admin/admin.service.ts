import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Admin } from "./models/admin.model";
import { JwtService } from "@nestjs/jwt";
import { hash, compare } from "bcrypt";
import { AdminSignInDto } from "./dto/admin_signin.dto";
import { Response } from "express";

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin) private adminModel: typeof Admin,
    private readonly jwtService: JwtService
  ) {}
  async adminGenerateTokens(admin: Admin) {
    const payload = {
      id: admin.id,
      is_active: admin.is_active,
      is_creator: admin.is_creator,
      photo: admin.photo,
    };
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.sign(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.sign(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return { access_token, refresh_token };
  }

  async addAdmin(createAdminDto: CreateAdminDto, res: Response) {
    const old_admin = await this.adminModel.findOne({
      where: { login: createAdminDto.login },
    });
    if (old_admin) {
      throw new BadRequestException("Admin alredy exists");
    }

    const hashed_password = await hash(createAdminDto.password, 7);

    const admin = await this.adminModel.create({
      ...createAdminDto,
      hashed_password,
    });
    const { access_token, refresh_token } =
      await this.adminGenerateTokens(admin);
    admin.hashed_refresh_token = await hash(refresh_token, 7);
    await admin.save();
    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
      maxAge: +process.env.REFRESH_TIME_MS,
    });
    return {
      message: "Admin added successfully",
      data: admin,
      accessToken: access_token,
    };
  }

  async adminSigIn(adminSignInDto: AdminSignInDto, res: Response) {
    const { login, password } = adminSignInDto;

    const admin = await this.adminModel.findOne({ where: { login } });
    if (!admin) {
      throw new UnauthorizedException("Login or password incorrect");
    }

    const validPassword = await compare(password, admin.hashed_password);
    if (!validPassword) {
      throw new UnauthorizedException("Login or password incorrect");
    }

    const { access_token, refresh_token } =
      await this.adminGenerateTokens(admin);
    admin.hashed_refresh_token = await hash(refresh_token, 7);
    await admin.save();
    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
      maxAge: +process.env.REFRESH_TIME_MS,
    });
    return {
      message: "Admin signed in successfully",
      accessToken: access_token,
    };
  }

  async adminRefreshToken(
    adminId: number,
    refresh_token: string,
    res: Response
  ) {
    const decodedToken = await this.jwtService.decode(refresh_token);
    if (+adminId !== decodedToken.id) {
      throw new BadRequestException("You are not allowed");
    }
    const admin = await this.adminModel.findOne({ where: { id: adminId } });
    if (!admin) {
      throw new BadRequestException("Admin not found");
    }

    const tokenMatch = await compare(refresh_token, admin.hashed_refresh_token);

    if (!tokenMatch) {
      throw new ForbiddenException("Forbidden");
    }
    const tokens = await this.adminGenerateTokens(admin);

    const hashed_refresh_token = await hash(tokens.refresh_token, 7);
    const updatedUser = await this.adminModel.update(
      {
        hashed_refresh_token,
      },
      { where: { id: adminId } }
    );
    res.cookie("refresh_token", tokens.refresh_token, {
      httpOnly: true,
      maxAge: +process.env.REFRESH_TIME_MS,
    });
    return {
      message: "Admin Refresh token successfully refreshshed",
      accessToken: tokens.access_token,
    };
  }

  async adminSignOut(refresh_token: string, res: Response) {
    const adminData = await this.jwtService.verify(refresh_token, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    if (!adminData) {
      throw new ForbiddenException("Admin not found");
    }

    const updateAdmin = await this.adminModel.update(
      { hashed_refresh_token: null },
      { where: { id: adminData.id } }
    );
    res.clearCookie("refresh_token");

    return {
      message: "Admin logged out successfully",
    };
  }
  findAll() {
    return this.adminModel.findAll();
  }

  findOne(id: number) {
    return this.adminModel.findByPk(id);
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return this.adminModel.update(updateAdminDto, { where: { id } });
  }

  remove(id: number) {
    return this.adminModel.destroy({ where: { id } });
  }
}
