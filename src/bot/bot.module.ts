import { Module } from "@nestjs/common";
import { BotService } from "./bot.service";
import { BootUpdate } from "./bot.update";
import { SequelizeModule } from "@nestjs/sequelize";
import { Bot } from "./models/bot.model";

@Module({
  imports: [SequelizeModule.forFeature([Bot])],
  providers: [BotService, BootUpdate],
  exports: [BotService],
})
export class BotModule {}
