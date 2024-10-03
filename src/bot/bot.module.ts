import { Module } from "@nestjs/common";
import { BotService } from "./bot.service";
import { BootUpdate } from "./bot.update";

@Module({
  controllers: [],
  providers: [BotService, BootUpdate],
})
export class BotModule {}
