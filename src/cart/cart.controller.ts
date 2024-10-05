import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { CartService } from "./cart.service";
import { CreateCartDto } from "./dto/create-cart.dto";
import { UpdateCartDto } from "./dto/update-cart.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Cart } from "./models/cart.model";

@ApiTags("carts")
@Controller("cart")
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @ApiOperation({ summary: "Create new cart" })
  @ApiResponse({
    status: 201,
    description: "Created new cart successfully",
    type: Cart,
  })
  @Post()
  create(@Body() createCartDto: CreateCartDto) {
    return this.cartService.create(createCartDto);
  }

  @ApiOperation({ summary: "Get all carts" })
  @ApiResponse({
    status: 200,
    description: "Successfully retrieved all carts",
    type: [Cart],
  })
  @Get()
  findAll() {
    return this.cartService.findAll();
  }

  @ApiOperation({ summary: "Get cart by ID" })
  @ApiResponse({
    status: 200,
    description: "Successfully retrieved cart",
    type: Cart,
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.cartService.findOne(+id);
  }

  @ApiOperation({ summary: "Update cart by ID" })
  @ApiResponse({
    status: 200,
    description: "Successfully updated cart",
  })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartService.update(+id, updateCartDto);
  }

  @ApiOperation({ summary: "Delete cart by ID" })
  @ApiResponse({
    status: 200,
    description: "Successfully deleted cart",
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.cartService.remove(+id);
  }
}
