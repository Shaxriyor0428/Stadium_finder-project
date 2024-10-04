import {
  Action,
  Command,
  Ctx,
  Hears,
  Help,
  On,
  Start,
  Update,
} from "nestjs-telegraf";
import { Context } from "telegraf";
import { BotService } from "./bot.service";

@Update()
export class BootUpdate {
  constructor(private readonly botService: BotService) {}
  @Start()
  async onStart(@Ctx() ctx: Context) {
    await this.botService.start(ctx);
  }

  @On("contact")
  async onConcact(@Ctx() ctx: Context) {
    await this.botService.onContact(ctx);
  }

  @Command("stop")
  async onStop(@Ctx() ctx: Context) {
    await this.botService.onStop(ctx);
  }

  @Command("address")
  async onAddress(@Ctx() ctx: Context) {
    await this.botService.onAddress(ctx);
  }

  @Hears("Add new address")
  async addNewAddress(@Ctx() ctx: Context) {
    await this.botService.addNewAddress(ctx);
  }

  @On("location")
  async onLocation(@Ctx() ctx: Context) {
    await this.botService.onLocation(ctx);
  }

  @Hears("My addresses")
  async myAddresses(@Ctx() ctx: Context) {
    await this.botService.myAddresses(ctx);
  }


  @Action(/location_+[1-9]/)
  async onClickLocation(@Ctx() ctx: Context) {
    await this.botService.onClickLocation(ctx);
  }

  @Command("search")
  async searchUserLocation(@Ctx() ctx:Context){
    await this.botService.searchUserLocation(ctx)
  }

  @Command("mycar")
  async onCar(@Ctx() ctx: Context) {
    await this.botService.onCar(ctx);
  }

  @Hears("Add new car")
  async addNewCar(@Ctx() ctx: Context) {
    await this.botService.addNewCar(ctx);
  }

  @Hears("My cars")
  async myCars(@Ctx() ctx: Context) {
    await this.botService.myCars(ctx);
  }

  @On("text")
  async onText(@Ctx() ctx: Context) {
    await this.botService.onText(ctx);
  }

}
