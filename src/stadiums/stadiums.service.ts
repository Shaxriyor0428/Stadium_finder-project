import { Injectable } from "@nestjs/common";
import { CreateStadiumDto } from "./dto/create-stadium.dto";
import { UpdateStadiumDto } from "./dto/update-stadium.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Stadium } from "./models/stadium.model";

@Injectable()
export class StadiumsService {
  constructor(@InjectModel(Stadium) private stadiumModel: typeof Stadium) {}
  create(createStadiumDto: CreateStadiumDto) {
    return this.stadiumModel.create(createStadiumDto);
  }

  findAll() {
    return this.stadiumModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.stadiumModel.findByPk(id, { include: { all: true } });
  }

  update(id: number, updateStadiumDto: UpdateStadiumDto) {
    return this.stadiumModel.update(updateStadiumDto, { where: { id } });
  }

  remove(id: number) {
    return this.stadiumModel.destroy({ where: { id } });
  }
}
