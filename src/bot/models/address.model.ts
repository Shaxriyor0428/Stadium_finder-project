import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Bot } from "./bot.model";

interface IAddressCreationAtrr {
  user_id: number;
  address_name: string;
  address: string;
  location: string;
  last_state:string;
}

@Table({ tableName: "address" })
export class Address extends Model<Address, IAddressCreationAtrr> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ type: DataType.STRING })
  address_name: string;

  @Column({ type: DataType.STRING })
  address: string;

  @Column({ type: DataType.STRING })
  location: string;

  @Column({ type: DataType.STRING })
  last_state: string;

  @ForeignKey(() => Bot)
  @Column({ type: DataType.BIGINT })
  user_id: number;

  @BelongsTo(() => Bot)
  bot: Bot;
}
