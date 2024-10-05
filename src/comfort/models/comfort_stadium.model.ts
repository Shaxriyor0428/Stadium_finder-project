import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Stadium } from "../../stadiums/models/stadium.model";
import { Comfort } from "./comfort.model";

@Table({ tableName: "comfort_stadium", timestamps: false })
export class ComfortStadium extends Model<ComfortStadium> {
  @ForeignKey(() => Stadium)
  @Column({ type: DataType.INTEGER })
  stadiumId: number;

  @ForeignKey(() => Comfort)
  @Column({ type: DataType.INTEGER })
  comfortId: number;
}
