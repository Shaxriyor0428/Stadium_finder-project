import { Command, Ctx, Hears, Help, On, Start, Update } from "nestjs-telegraf";
import { Context } from "telegraf";
import { BotService } from "./bot.service";

@Update()
export class BootUpdate {
  constructor(private readonly botService: BotService) {}
  @Start()
  async onStart(@Ctx() ctx: Context) {
    await this.botService.start(ctx);
  }
}
