import { Injectable } from "@nestjs/common";
import { CreateComfortDto } from "./dto/create-comfort.dto";
import { UpdateComfortDto } from "./dto/update-comfort.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Comfort } from "./models/comfort.model";

@Injectable()
export class ComfortService {
  constructor(@InjectModel(Comfort) private comfortModel: typeof Comfort) {}
  create(createComfortDto: CreateComfortDto) {
    return this.comfortModel.create(createComfortDto);
  }

  findAll() {
    return this.comfortModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.comfortModel.findByPk(id, { include: { all: true } });
  }

  update(id: number, updateComfortDto: UpdateComfortDto) {
    return this.comfortModel.update(updateComfortDto, { where: { id } });
  }

  remove(id: number) {
    return this.comfortModel.destroy({ where: { id } });
  }
}
