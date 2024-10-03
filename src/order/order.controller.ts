import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from "@nestjs/common";
import { OrderService } from "./order.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Order } from "./models/order.model";

@ApiTags("Order")
@Controller("order")
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiOperation({ summary: "Create a new order" })
  @ApiResponse({
    status: 201,
    description: "The order has been successfully created.",
    type: Order,
  })
  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @ApiOperation({ summary: "Get all orders" })
  @ApiResponse({
    status: 200,
    description: "List of orders",
    type: [Order],
  })
  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @ApiOperation({ summary: "Get an order by ID" })
  @ApiResponse({
    status: 200,
    description: "The order with the given ID.",
    type: Order,
  })
  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: string) {
    return this.orderService.findOne(+id);
  }

  @ApiOperation({ summary: "Update an order by ID" })
  @ApiResponse({
    status: 200,
    description: "The order has been successfully updated.",
  })
  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: string,
    @Body() updateOrderDto: UpdateOrderDto
  ) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @ApiOperation({ summary: "Delete an order by ID" })
  @ApiResponse({
    status: 200,
    description: "The order has been successfully deleted.",
  })
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: string) {
    return this.orderService.remove(+id);
  }
}
