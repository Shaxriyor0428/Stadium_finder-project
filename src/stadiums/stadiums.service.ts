import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateStadiumDto } from "./dto/create-stadium.dto";
import { UpdateStadiumDto } from "./dto/update-stadium.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Stadium } from "./models/stadium.model";
import { Comfort } from "../comfort/models/comfort.model";

@Injectable()
export class StadiumsService {
  constructor(
    @InjectModel(Stadium) private stadiumModel: typeof Stadium,
    @InjectModel(Comfort) private comfortModel: typeof Comfort
  ) {}
  async create(createStadiumDto: CreateStadiumDto) {
    const stadium = await this.stadiumModel.create(createStadiumDto);
    const comfort = await this.comfortModel.findByPk(
      createStadiumDto.comfortId
    );
    if (!comfort) {
      throw new BadRequestException("Comfort is not found");
    }

    await stadium.$set("comforts", [createStadiumDto.comfortId]);

    return stadium;
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
