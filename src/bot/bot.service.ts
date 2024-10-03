import { Injectable } from "@nestjs/common";
import { CreateBotDto } from "./dto/create-bot.dto";
import { UpdateBotDto } from "./dto/update-bot.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Bot } from "./models/bot.model";
import { InjectBot } from "nestjs-telegraf";
import { BOT_NAME } from "./app.constants";
import { Context, Telegraf } from "telegraf";
import { Markup } from "telegraf";

@Injectable()
export class BotService {
  constructor(
    @InjectModel(Bot) private botModel: typeof Bot,
    @InjectBot(BOT_NAME) private bot: Telegraf<Context>
  ) {}
  async start(ctx: Context) {
    const userId = ctx.from.id;
    const user = await this.botModel.findByPk(userId);
    if (!user) {
      await this.botModel.create({
        user_id: userId,
        username: ctx.from.username,
        first_name: ctx.from.first_name,
        last_name: ctx.from.last_name,
        lang: ctx.from.language_code,
      });
      await ctx.reply(`Send me your <b>phone number</b>`, {
        parse_mode: "HTML",
        ...Markup.keyboard([
          [Markup.button.contactRequest("Send me your number")],
        ])
          .resize()
          .oneTime(),
      });
    }
  }
}
