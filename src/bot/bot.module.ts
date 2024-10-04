import { Module } from "@nestjs/common";
import { BotService } from "./bot.service";
import { BootUpdate } from "./bot.update";
import { SequelizeModule } from "@nestjs/sequelize";
import { Bot } from "./models/bot.model";
import { Address } from "./models/address.model";
import { Car } from "./models/user_cars.model";

@Module({
  imports: [SequelizeModule.forFeature([Bot, Address, Car])],
  providers: [BotService, BootUpdate],
  exports: [BotService],
})
export class BotModule {}
