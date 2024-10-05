import { Module } from "@nestjs/common";
import { ComfortService } from "./comfort.service";
import { ComfortController } from "./comfort.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Comfort } from "./models/comfort.model";
import { ComfortStadium } from "./models/comfort_stadium.model";
import { Stadium } from "../stadiums/models/stadium.model";

@Module({
  imports: [SequelizeModule.forFeature([Comfort, ComfortStadium, Stadium])],
  controllers: [ComfortController],
  providers: [ComfortService],
})
export class ComfortModule {}
