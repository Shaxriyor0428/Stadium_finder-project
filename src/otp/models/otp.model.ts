import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IMyOtpCreationAttr {
  id: string;
  otp: string;
  expiration_time: Date;
  verifyied: boolean;
  phone_number: string;
}
@Table({ tableName: "otp" })
export class Otp extends Model<Otp, IMyOtpCreationAttr> {
  @Column({ type: DataType.UUID, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING })
  otp: string;

  @Column({ type: DataType.DATE })
  expiration_time: Date;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  verifyied: boolean;

  @Column({ type: DataType.STRING })
  phone_number: string;
}
