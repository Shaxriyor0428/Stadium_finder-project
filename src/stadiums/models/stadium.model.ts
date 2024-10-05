import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { Category } from "../../categories/models/category.model";
import { Region } from "../../region/models/region.model";
import { Media } from "../../media/models/media.model";
import { Order } from "../../order/models/order.model";
import { StadiumTime } from "../../stadium_times/models/stadium_time.model";
import { Comfort } from "../../comfort/models/comfort.model";
import { ComfortStadium } from "../../comfort/models/comfort_stadium.model";

interface IStadiumCreationAttr {
  contact_with: string;
  name: string;
  volume: string;
  address: string;
  location: string;
  buildAt: string;
  start_time: string;
  end_time: string;
}

@Table({ tableName: "stadium", timestamps: false })
export class Stadium extends Model<Stadium, IStadiumCreationAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, unique: true })
  name: string;

  @Column({ type: DataType.STRING })
  volume: string;

  @Column({ type: DataType.STRING })
  address: string;

  @Column({ type: DataType.STRING })
  location: string;

  @Column({ type: DataType.DATEONLY })
  buildAt: string;

  @Column({ type: DataType.TIME })
  start_time: string;

  @Column({ type: DataType.TIME })
  end_time: string;

  @ForeignKey(() => Category)
  @Column({ type: DataType.INTEGER })
  categoryId: number;

  @BelongsTo(() => Category)
  category: Category;

  @ForeignKey(() => Region)
  @Column({ type: DataType.INTEGER })
  regionId: number;

  @BelongsTo(() => Region)
  region: Region;

  @HasMany(() => Media)
  medias: Media[];

  @HasMany(() => Order)
  orders: Order[];

  @HasMany(() => StadiumTime)
  stadium_times: StadiumTime[];

  @BelongsToMany(() => Comfort, () => ComfortStadium)
  comforts: Comfort[];
}
