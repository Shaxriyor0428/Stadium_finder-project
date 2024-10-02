import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Req,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "./models/user.model";
import { Request, Response } from "express";
import { UserSignInDto } from "./dto/user-signIn.dto";

@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @ApiOperation({ summary: "Regiser a new User" })
  @ApiResponse({
    status: 201,
    description: "User successfully registered",
    type: User,
  })
  @Post("signup")
  signUp(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.usersService.signUp(createUserDto, res);
  }

  @ApiOperation({ summary: "Sign in User" })
  @ApiResponse({
    status: 200,
    description: "User successfully signed in",
    type: User,
  })
  @Post("signin")
  signIn(
    @Body() userSignInDto: UserSignInDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.usersService.signIn(userSignInDto, res);
  }

  @ApiOperation({ summary: "Sign out User" })
  @ApiResponse({
    status: 200,
    description: "User successfully signed out",
  })
  @Post("signout")
  signOut(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return this.usersService.signOut(req, res);
  }

  @ApiOperation({ summary: "Refresh User's access token" })
  @ApiResponse({
    status: 200,
    description: "User's access token refreshed successfully",
  })
  @Post("refresh-token")
  userRefreshToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.usersService.userRefreshToken(req, res);
  }

  @ApiOperation({ summary: "Activate User account" })
  @ApiResponse({
    status: 200,
    description: "User account activated successfully",
  })
  @Get("activate/:link")
  userActivate(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return this.usersService.userActivate(req, res);
  }

  @ApiOperation({ summary: "Get all Users" })
  @ApiResponse({
    status: 200,
    description: "List of Users",
    type: [User],
  })
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: "Get user by ID" })
  @ApiResponse({
    status: 200,
    description: "User retrieved",
    type: User,
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(+id);
  }

  @ApiOperation({ summary: "Update user by ID" })
  @ApiResponse({
    status: 200,
    description: "User updated",
  })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @ApiOperation({ summary: "Delete user by ID" })
  @ApiResponse({
    status: 200,
    description: "User deleted",
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.usersService.remove(+id);
  }
}
