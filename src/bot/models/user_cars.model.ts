import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Bot } from "./bot.model";

interface ICarCreationAtrr {
  user_id: number;
  car_number: string;
  model: string;
  color: string;
  year: string;
  last_state: string;
}
@Table({ tableName: "car", timestamps: false })
export class Car extends Model<Car, ICarCreationAtrr> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ type: DataType.STRING })
  car_number: string;

  @Column({ type: DataType.STRING })
  model: string;

  @Column({ type: DataType.STRING })
  color: string;

  @Column({ type: DataType.STRING })
  year: string;

  @Column({ type: DataType.STRING })
  last_state: string;

  @ForeignKey(() => Bot)
  @Column({ type: DataType.BIGINT })
  user_id: number;

  @BelongsTo(() => Bot)
  bot: Bot;
}
