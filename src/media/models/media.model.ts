import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Stadium } from "../../stadiums/models/stadium.model";

interface IMediaCreationAtrr {
  photo: string;
  description: string;
}
@Table({ tableName: "media", timestamps: false })
export class Media extends Model<Media, IMediaCreationAtrr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING })
  photo: string;

  @Column({ type: DataType.STRING })
  description: string;

  @ForeignKey(() => Stadium)
  @Column({ type: DataType.INTEGER })
  stadiumId: number;

  @BelongsTo(() => Stadium)
  stadium: Stadium;
}
