import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  UseGuards,
  ParseIntPipe,
} from "@nestjs/common";
import { AdminService } from "./admin.service";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { Response } from "express";
import { AdminSignInDto } from "./dto/admin_signin.dto";
import { AdminGuard } from "../guards/admin.guard";
import { CreatorGuard } from "../guards/creator.guard";
import { SelfAdminGuard } from "../guards/admin_self.guard";
import { CookiGetter } from "../decorators/cokie_getter.decorator";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Admin } from "./models/admin.model";

@ApiTags("Admin")
@Controller("admin")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiOperation({ summary: "Create new admin" })
  @ApiResponse({
    status: 201,
    description: "Created new admin",
    type: Admin,
  })
  @UseGuards(CreatorGuard)
  @Post()
  create(
    @Body() createAdminDto: CreateAdminDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.adminService.addAdmin(createAdminDto, res);
  }

  @ApiOperation({ summary: "Admin sign in" })
  @ApiResponse({
    status: 200,
    description: "Successfully signed in",
  })
  @Post("signin")
  async adminSignIn(
    @Body() adminSignInDto: AdminSignInDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.adminService.adminSigIn(adminSignInDto, res);
  }

  @ApiOperation({ summary: "Refresh admin token" })
  @ApiResponse({
    status: 200,
    description: "Token refreshed successfully",
  })
  @UseGuards(SelfAdminGuard)
  @Post("refresh_token/:id")
  async adminRefreshToken(
    @Param("id", ParseIntPipe) adminId: number,
    @CookiGetter("refresh_token") refresh_token: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.adminService.adminRefreshToken(adminId, refresh_token, res);
  }

  @ApiOperation({ summary: "Admin sign out" })
  @ApiResponse({
    status: 200,
    description: "Signed out successfully",
  })
  @Get("signout")
  async adminSignOut(
    @CookiGetter("refresh_token") refresh_token: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.adminService.adminSignOut(refresh_token, res);
  }

  @ApiOperation({ summary: "Get all admins" })
  @ApiResponse({
    status: 200,
    description: "Returns list of all admins",
    type: [Admin],
  })
  @UseGuards(AdminGuard)
  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @ApiOperation({ summary: "Get admin by ID" })
  @ApiResponse({
    status: 200,
    description: "Returns admin by ID",
    type: Admin,
  })
  @UseGuards(SelfAdminGuard)
  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: string) {
    return this.adminService.findOne(+id);
  }

  @ApiOperation({ summary: "Update admin by ID" })
  @ApiResponse({
    status: 200,
    description: "Admin updated successfully",
  })
  @UseGuards(SelfAdminGuard, AdminGuard)
  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: string,
    @Body() updateAdminDto: UpdateAdminDto
  ) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @ApiOperation({ summary: "Delete admin by ID" })
  @ApiResponse({
    status: 200,
    description: "Admin deleted successfully",
  })
  @UseGuards(SelfAdminGuard, AdminGuard)
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: string) {
    return this.adminService.remove(+id);
  }
}
