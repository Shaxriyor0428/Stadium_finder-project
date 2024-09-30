import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Region } from "../../region/models/region.model";

interface IDistrictCreationAtrr {
  name: string;
}
@Table({ tableName: "district", timestamps: false })
export class District extends Model<District, IDistrictCreationAtrr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING })
  name: string;

  @ForeignKey(() => Region)
  @Column({ type: DataType.INTEGER })
  regionId: number;

  @BelongsTo(() => Region)
  regions: Region;
}
