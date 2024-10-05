import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateComfortDto } from "./dto/create-comfort.dto";
import { UpdateComfortDto } from "./dto/update-comfort.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Comfort } from "./models/comfort.model";
import { Stadium } from "../stadiums/models/stadium.model";

@Injectable()
export class ComfortService {
  constructor(
    @InjectModel(Comfort) private comfortModel: typeof Comfort,
    @InjectModel(Stadium) private stadiumModel: typeof Stadium
  ) {}
  async create(createComfortDto: CreateComfortDto) {
    const comfort = await this.comfortModel.create(createComfortDto);
    const stadium = await this.stadiumModel.findByPk(
      createComfortDto.stadiumId
    );
    // console.log(stadium);
    
    if (!stadium) {
      throw new BadRequestException("Stadium is not found");
    }
    await comfort.$set("stadiums", [createComfortDto.stadiumId]);

    return comfort;
  }

  findAll() {
    return this.comfortModel.findAll({
      include: [
        {
          model: Stadium,
        },
      ],
    });
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
