import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { User } from "../../users/models/user.model";
import { Stadium } from "../../stadiums/models/stadium.model";

interface IOrderCreationAttr {
  description: string;
  status: string;
  date: string;
}

@Table({ tableName: "order", timestamps: false })
export class Order extends Model<Order, IOrderCreationAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING })
  description: string;

  @Column({ type: DataType.STRING })
  date: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Stadium)
  @Column({ type: DataType.INTEGER })
  stadiumId: number;

  @BelongsTo(() => Stadium)
  stadium: Stadium;
}
