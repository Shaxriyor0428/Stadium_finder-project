import { Injectable } from "@nestjs/common";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Category } from "./models/category.model";

@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Category) private categoryModle: typeof Category) {}
  create(createCategoryDto: CreateCategoryDto) {
    return this.categoryModle.create(createCategoryDto);
  }

  findAll() {
    return this.categoryModle.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.categoryModle.findByPk(id, { include: { all: true } });
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return this.categoryModle.update(updateCategoryDto, { where: { id } });
  }

  remove(id: number) {
    return this.categoryModle.destroy({ where: { id } });
  }
}
