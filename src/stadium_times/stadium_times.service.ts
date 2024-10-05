import { Injectable } from "@nestjs/common";
import { CreateStadiumTimeDto } from "./dto/create-stadium_time.dto";
import { UpdateStadiumTimeDto } from "./dto/update-stadium_time.dto";
import { InjectModel } from "@nestjs/sequelize";
import { StadiumTime } from "./models/stadium_time.model";

@Injectable()
export class StadiumTimesService {
  constructor(
    @InjectModel(StadiumTime) private stadiumTimesModel: typeof StadiumTime
  ) {}
  create(createStadiumTimeDto: CreateStadiumTimeDto) {
    return this.stadiumTimesModel.create(createStadiumTimeDto);
  }

  findAll() {
    return this.stadiumTimesModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.stadiumTimesModel.findByPk(id, { include: { all: true } });
  }

  update(id: number, updateStadiumTimeDto: UpdateStadiumTimeDto) {
    return this.stadiumTimesModel.update(updateStadiumTimeDto, {
      where: { id },
    });
  }

  remove(id: number) {
    return this.stadiumTimesModel.destroy({ where: { id } });
  }
}
