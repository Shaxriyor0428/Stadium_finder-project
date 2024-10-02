import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { User } from "../../users/models/user.model";

interface IUserCardCreationAttr {
  name: string;
  phone: string;
  number: number;
  year: string;
  month: string;
}
@Table({ tableName: "user_card", timestamps: false })
export class UserCard extends Model<UserCard, IUserCardCreationAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING })
  name: string;

  @Column({ type: DataType.INTEGER })
  number: number;

  @Column({ type: DataType.STRING })
  phone: string;

  @Column({ type: DataType.STRING })
  year: string;

  @Column({ type: DataType.STRING })
  month: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  is_active: boolean;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  is_main: boolean;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
