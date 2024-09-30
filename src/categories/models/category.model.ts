import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";

interface ICategoryCreationAtrr {
  name: string;
}
@Table({ tableName: "category", timestamps: false })
export class Category extends Model<Category, ICategoryCreationAtrr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING })
  name: string;

  @ForeignKey(() => Category)
  @Column({ type: DataType.INTEGER })
  parentId: number;

  @BelongsTo(() => Category)
  parent: Category;
}
