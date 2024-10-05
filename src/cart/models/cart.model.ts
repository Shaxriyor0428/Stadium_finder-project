import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { User } from "../../users/models/user.model";
import { UserWallet } from "../../user_wallet/models/user_wallet.model";
import { Order } from "../../order/models/order.model";

interface ICartCreationAtrr {
  date: string;
  status: string;
}
@Table({ tableName: "cart" })
export class Cart extends Model<Cart, ICartCreationAtrr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.DATEONLY })
  date: string;

  @Column({ type: DataType.STRING })
  status: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;
  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Order)
  @Column({ type: DataType.INTEGER })
  orderId: number;
  @BelongsTo(() => Order)
  order: Order;

  @ForeignKey(() => UserWallet)
  @Column({ type: DataType.INTEGER })
  user_walletId: number;
  @BelongsTo(() => UserWallet)
  user_wallet: UserWallet;
}
