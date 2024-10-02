import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { UserCard } from "../../user_card/models/user_card.model";

interface IUserCreationAttr {
  full_name: string;
  email: string;
  phone: string;
  tg_link: string;
  hashed_password: string;
  photo: string;
}

@Table({ tableName: "users" })
export class User extends Model<User, IUserCreationAttr> {
  @ApiProperty({
    example: 1,
    description: "User unique ID (autoIncrement)",
  })
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({
    example: "Bobur Sohibov",
    description: "User full name",
  })
  @Column({ type: DataType.STRING, allowNull: false })
  full_name: string;

  @ApiProperty({
    example: "Bobur@gmail.com",
    description: "User email",
  })
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  email: string;

  @Column({ type: DataType.STRING })
  phone: string;

  @Column({ type: DataType.STRING })
  tg_link: string;

  @Column({ type: DataType.STRING })
  hashed_password: string;

  @Column({ type: DataType.STRING })
  photo: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  is_active: boolean;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  is_owner: boolean;

  @Column({ type: DataType.STRING })
  hashed_refresh_token: string;

  @Column({ type: DataType.STRING })
  activation_link: string;

  @HasMany(() => UserCard)
  usercards: UserCard[];
}
