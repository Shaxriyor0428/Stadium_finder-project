import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { District } from "../../district/models/district.model";

interface IRegionCreationAtrr {
  name: string;
}
@Table({ tableName: "region", timestamps: false })
export class Region extends Model<Region, IRegionCreationAtrr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING })
  name: string;

  @HasMany(() => District)
  district: District[];
}
