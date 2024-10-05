import { Module } from "@nestjs/common";
import { StadiumsService } from "./stadiums.service";
import { StadiumsController } from "./stadiums.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Stadium } from "./models/stadium.model";
import { Comfort } from "../comfort/models/comfort.model";

@Module({
  imports: [SequelizeModule.forFeature([Stadium, Comfort])],
  controllers: [StadiumsController],
  providers: [StadiumsService],
})
export class StadiumsModule {}
