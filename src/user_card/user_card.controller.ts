import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { UserCardService } from "./user_card.service";
import { CreateUserCardDto } from "./dto/create-user_card.dto";
import { UpdateUserCardDto } from "./dto/update-user_card.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserCard } from "./models/user_card.model";

@ApiTags("User cards")
@Controller("user-card")
export class UserCardController {
  constructor(private readonly userCardService: UserCardService) {}

  @ApiOperation({ summary: "Create new user card" })
  @ApiResponse({
    status: 201,
    description: "Card created",
    type: UserCard,
  })
  @Post()
  create(@Body() createUserCardDto: CreateUserCardDto) {
    return this.userCardService.create(createUserCardDto);
  }

  @ApiOperation({ summary: "Get all user cards" })
  @ApiResponse({
    status: 200,
    description: "List of user cards",
    type: [UserCard],
  })
  @Get()
  findAll() {
    return this.userCardService.findAll();
  }

  @ApiOperation({ summary: "Get user card by ID" })
  @ApiResponse({
    status: 200,
    description: "User card found",
    type: UserCard,
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.userCardService.findOne(+id);
  }

  @ApiOperation({ summary: "Update user card by ID" })
  @ApiResponse({
    status: 200,
    description: "User card updated",
  })
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateUserCardDto: UpdateUserCardDto
  ) {
    return this.userCardService.update(+id, updateUserCardDto);
  }

  @ApiOperation({ summary: "Delete user card by ID" })
  @ApiResponse({
    status: 200,
    description: "User card deleted",
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.userCardService.remove(+id);
  }
}
