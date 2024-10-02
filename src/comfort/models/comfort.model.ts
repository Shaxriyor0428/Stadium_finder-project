import { Column, DataType, Model, Table } from "sequelize-typescript";
interface IComfortCreationAtrr {
  name: string;
}
@Table({ tableName: "comfort", timestamps: false })
export class Comfort extends Model<Comfort, IComfortCreationAtrr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING })
  name: string;
}
