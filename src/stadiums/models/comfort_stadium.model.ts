import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Stadium } from "../../stadiums/models/stadium.model";
import { Comfort } from "../../comfort/models/comfort.model";

@Table({ tableName: "comfort_stadium", timestamps: false })
export class ComfortStadium extends Model<ComfortStadium> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => Stadium)
  @Column({ type: DataType.INTEGER })
  stadiumId: number;

  @BelongsTo(() => Stadium)
  stadium: Stadium;

  @ForeignKey(() => Comfort)
  @Column({ type: DataType.INTEGER })
  comfortId: number;

  @BelongsTo(() => Comfort)
  comfort: Comfort;
}
