import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Order } from "./models/order.model";

@Injectable()
export class OrderService {
  constructor(@InjectModel(Order) private orderModel: typeof Order) {}

  async create(createOrderDto: CreateOrderDto) {
    const new_order = await this.orderModel.create(createOrderDto);
    return new_order;
  }
  findAll() {
    return this.orderModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.orderModel.findByPk(id, { include: { all: true } });
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return this.orderModel.update(updateOrderDto, { where: { id } });
  }

  remove(id: number) {
    return this.orderModel.destroy({ where: { id } });
  }
}
