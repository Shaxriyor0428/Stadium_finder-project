import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Stadium } from "../../stadiums/models/stadium.model";

interface IStadiumTimeCreationAtrr {
  start_time: string;
  end_time: string;
  price: number;
  day: number;
}

@Table({ tableName: "stadium_times", timestamps: false })
export class StadiumTime extends Model<StadiumTime, IStadiumTimeCreationAtrr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.TIME })
  start_time: string;

  @Column({ type: DataType.TIME })
  end_time: string;

  @Column({ type: DataType.DECIMAL })
  price: number;

  @Column({ type: DataType.INTEGER })
  day: number;

  @ForeignKey(() => Stadium)
  @Column({ type: DataType.INTEGER })
  stadiumId: number;

  @BelongsTo(() => Stadium)
  stadium: Stadium;
}
