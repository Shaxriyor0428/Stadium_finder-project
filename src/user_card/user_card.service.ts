import { Injectable } from "@nestjs/common";
import { CreateUserCardDto } from "./dto/create-user_card.dto";
import { UpdateUserCardDto } from "./dto/update-user_card.dto";
import { InjectModel } from "@nestjs/sequelize";
import { UserCard } from "./models/user_card.model";

@Injectable()
export class UserCardService {
  constructor(@InjectModel(UserCard) private userCardModel: typeof UserCard) {}
  create(createUserCardDto: CreateUserCardDto) {
    return this.userCardModel.create(createUserCardDto);
  }

  findAll() {
    return this.userCardModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.userCardModel.findByPk(id, { include: { all: true } });
  }

  update(id: number, updateUserCardDto: UpdateUserCardDto) {
    return this.userCardModel.update(updateUserCardDto, { where: { id } });
  }

  remove(id: number) {
    return this.userCardModel.destroy({ where: { id } });
  }
}
