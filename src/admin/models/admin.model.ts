import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IAdminCreationAttr {
  login: string;
  tg_link: string;
  photo: string;
  hashed_password: string;
}

@Table({ tableName: "admin", timestamps: false })
export class Admin extends Model<Admin, IAdminCreationAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  login: string;

  @Column({ type: DataType.STRING })
  tg_link: string;

  @Column({ type: DataType.STRING })
  photo: string;

  @Column({ type: DataType.STRING })
  hashed_password: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  is_active: boolean;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  is_creator: boolean;

  @Column({ type: DataType.STRING })
  hashed_refresh_token: string;
}
