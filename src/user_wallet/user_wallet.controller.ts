import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { UserWalletService } from "./user_wallet.service";
import { CreateUserWalletDto } from "./dto/create-user_wallet.dto";
import { UpdateUserWalletDto } from "./dto/update-user_wallet.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserWallet } from "./models/user_wallet.model";

@ApiTags("User wallet")
@Controller("user-wallet")
export class UserWalletController {
  constructor(private readonly userWalletService: UserWalletService) {}

  @ApiOperation({ summary: "Create new user wallet" })
  @ApiResponse({
    status: 201,
    description: "User wallet created",
    type: UserWallet,
  })
  @Post()
  create(@Body() createUserWalletDto: CreateUserWalletDto) {
    return this.userWalletService.create(createUserWalletDto);
  }

  @ApiOperation({ summary: "Get all user wallets" })
  @ApiResponse({
    status: 200,
    description: "List of all user wallets",
    type: [UserWallet],
  })
  @Get()
  findAll() {
    return this.userWalletService.findAll();
  }

  @ApiOperation({ summary: "Get user wallet by ID" })
  @ApiResponse({
    status: 200,
    description: "User wallet retrieved by ID",
    type: UserWallet,
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.userWalletService.findOne(+id);
  }

  @ApiOperation({ summary: "Update user wallet by ID" })
  @ApiResponse({
    status: 200,
    description: "User wallet updated",
  })
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateUserWalletDto: UpdateUserWalletDto
  ) {
    return this.userWalletService.update(+id, updateUserWalletDto);
  }

  @ApiOperation({ summary: "Delete user wallet by ID" })
  @ApiResponse({
    status: 200,
    description: "User wallet deleted",
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.userWalletService.remove(+id);
  }
}
