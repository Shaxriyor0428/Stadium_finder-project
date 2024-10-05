import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from "sequelize-typescript";
import { Stadium } from "../../stadiums/models/stadium.model";
import { ComfortStadium } from "./comfort_stadium.model";
interface IComfortCreationAtrr {
  name: string;
}
@Table({ tableName: "comfort", timestamps: false })
export class Comfort extends Model<Comfort, IComfortCreationAtrr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING })
  name: string;

  @BelongsToMany(() => Stadium, () => ComfortStadium)
  stadiums: Stadium[];
  
}
