import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Bot } from "./models/bot.model";
import { InjectBot } from "nestjs-telegraf";
import { BOT_NAME } from "./app.constants";
import { Context, Telegraf } from "telegraf";
import { Markup } from "telegraf";
import { Address } from "./models/address.model";
import { repl } from "@nestjs/core";
import { Car } from "./models/user_cars.model";

@Injectable()
export class BotService {
  constructor(
    @InjectModel(Bot) private botModel: typeof Bot,
    @InjectModel(Address) private addressModel: typeof Address,
    @InjectModel(Car) private carModel: typeof Car,
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
          [Markup.button.contactRequest("📞  Send me your number")],
        ])
          .resize()
          .oneTime(),
      });
    } else if (!user.status) {
      await ctx.reply(`Send me your <b>phone number</b>`, {
        parse_mode: "HTML",
        ...Markup.keyboard([
          [Markup.button.contactRequest("📞  Send me your number")],
        ])
          .resize()
          .oneTime(),
      });
    } else {
      await ctx.reply(`This bot stadium owners 'for activate`, {
        parse_mode: "HTML",
        ...Markup.removeKeyboard(),
      });
    }
  }

  async onContact(ctx: Context) {
    if ("contact" in ctx.message) {
      const userId = ctx.from.id;
      const user = await this.botModel.findByPk(userId);
      if (!user) {
        await ctx.reply(`Please press the start button`, {
          parse_mode: "HTML",
          ...Markup.keyboard([["/start"]])
            .resize()
            .oneTime(),
        });
      } else if (ctx.message.contact.user_id != userId) {
        await ctx.reply(`Please, send me your phone number`, {
          parse_mode: "HTML",
          ...Markup.keyboard([
            [Markup.button.contactRequest("📞  Send me your number")],
          ])
            .resize()
            .oneTime(),
        });
      } else {
        await this.botModel.update(
          {
            phone_number: ctx.message.contact.phone_number,
            status: true,
          },
          { where: { user_id: userId } }
        );
        await ctx.reply(`Congratulations, you have been activated`, {
          parse_mode: "HTML",
          ...Markup.removeKeyboard(),
        });
      }
    }
  }

  async onStop(ctx: Context) {
    const userId = ctx.from.id;
    const user = await this.botModel.findByPk(userId);
    if (!user) {
      await ctx.reply(`You have not registered before`, {
        parse_mode: "HTML",
        ...Markup.keyboard([["/start"]])
          .resize()
          .oneTime(),
      });
    } else if (user.status) {
      await this.botModel.update(
        { status: false, phone_number: null },
        { where: { user_id: userId } }
      );
      // await this.bot.telegram.sendChatAction(user.user_id, "typing");
      // await this.bot.telegram.sendChatAction(user.user_id, "upload_video");

      await ctx.reply(`You successfully sign out`, {
        parse_mode: "HTML",
        ...Markup.removeKeyboard(),
      });
    }
  }

  async onAddress(ctx: Context) {
    await ctx.reply(`Addresses`, {
      parse_mode: "HTML",
      ...Markup.keyboard([["My addresses", "Add new address"]]).resize(),
    });
  }

  async addNewAddress(ctx: Context) {
    const userId = ctx.from.id;
    const user = await this.botModel.findByPk(userId);
    if (!user) {
      await ctx.reply(`You have not registered before`, {
        parse_mode: "HTML",
        ...Markup.keyboard([["/start"]])
          .resize()
          .oneTime(),
      });
    } else {
      await this.addressModel.create({
        user_id: userId,
        last_state: "address_name",
      });
      await ctx.reply(`Enter the address name: `, {
        parse_mode: "HTML",
        ...Markup.removeKeyboard(),
      });
    }
  }

  async onText(ctx: Context) {
    if ("text" in ctx.message) {
      const userId = ctx.from.id;
      const user = await this.botModel.findByPk(userId);
      if (!user) {
        await ctx.reply(`You have not registered before`, {
          parse_mode: "HTML",
          ...Markup.keyboard([["/start"]])
            .resize()
            .oneTime(),
        });
      } else {
        const address = await this.addressModel.findOne({
          where: { user_id: userId },
          order: [["id", "DESC"]],
        });
        if (address && address.last_state !== "finish") {
          // console.log("salom ishladi");

          if (address.last_state == "address_name") {
            address.address_name = ctx.message.text;
            address.last_state = "address";
            await address.save();
            await ctx.reply(`Enter the address: `, {
              parse_mode: "HTML",
              ...Markup.removeKeyboard(),
            });
          } else if (address.last_state == "address") {
            address.address = ctx.message.text;
            address.last_state = "location";
            await address.save();
            await ctx.reply(`Enter the address location: `, {
              parse_mode: "HTML",
              ...Markup.keyboard([
                [Markup.button.locationRequest("📍 Send location")],
              ])
                .resize()
                .oneTime(),
            });
          }
        }
        const car = await this.carModel.findOne({
          where: { user_id: userId },
          order: [["id", "DESC"]],
        });

        if (car) {
          if (car.last_state == "car_number") {
            car.car_number = ctx.message.text;
            car.last_state = "model";
            await car.save();
            await ctx.reply(`Enter the car model: `, {
              parse_mode: "HTML",
              ...Markup.removeKeyboard(),
            });
          } else if (car.last_state == "model") {
            car.model = ctx.message.text;
            car.last_state = "color";
            await car.save();
            await ctx.reply(`Enter the car color: `, {
              parse_mode: "HTML",
              ...Markup.removeKeyboard(),
            });
          } else if (car.last_state == "color") {
            car.color = ctx.message.text;
            car.last_state = "year";
            await car.save();
            await ctx.reply(`Enter the car year: `, {
              parse_mode: "HTML",
              ...Markup.removeKeyboard(),
            });
          } else if (car.last_state == "year") {
            car.year = ctx.message.text;
            car.last_state = "finish";
            await car.save();
            await ctx.reply(`Car successfully added: `, {
              parse_mode: "HTML",
              ...Markup.keyboard([["My cars", "Add new car"]]).resize(),
            });
          }
        }
      }
    }
  }

  async onLocation(ctx: Context) {
    if ("location" in ctx.message) {
      const userId = ctx.from.id;
      const user = await this.botModel.findByPk(userId);
      if (!user) {
        await ctx.reply(`You have not registered before`, {
          parse_mode: "HTML",
          ...Markup.keyboard([["/start"]])
            .resize()
            .oneTime(),
        });
      } else {
        const address = await this.addressModel.findOne({
          where: { user_id: userId },
          order: [["id", "DESC"]],
        });
        if (address && address.last_state !== "finish") {
          if (address.last_state == "location") {
            address.location = `${ctx.message.location.latitude},${ctx.message.location.longitude}`;
            address.last_state = "finish";
            await address.save();
            await ctx.reply(`Address added: `, {
              parse_mode: "HTML",
              ...Markup.keyboard([
                ["My addresses", "Add new address"],
              ]).resize(),
            });
          }
        } else {
          const searchLatitude: number = ctx.message.location.latitude;
          const searchLongitude: number = ctx.message.location.longitude;
          const userLatitude = Number(address.location.split(",")[0]);
          const userLongtitude = Number(address.location.split(",")[1]);

          const result = this.haversine(
            userLatitude,
            userLongtitude,
            searchLatitude,
            searchLongitude
          );
          ctx.reply(`Oradagi masofa ${result.toFixed(2)} - km`);
        }
      }
    }
  }

  async searchUserLocation(ctx: Context) {
    await ctx.reply(`Enter the search location: `, {
      parse_mode: "HTML",
      ...Markup.keyboard([[Markup.button.locationRequest("📍 Send location")]])
        .resize()
        .oneTime(),
    });
  }

  async myAddresses(ctx: Context) {
    const userId = ctx.from.id;
    const user = await this.botModel.findByPk(userId);
    if (!user) {
      await ctx.reply(`You have not registered before`, {
        parse_mode: "HTML",
        ...Markup.keyboard([["/start"]])
          .resize()
          .oneTime(),
      });
    } else {
      const addresses = await this.addressModel.findAll({
        where: { user_id: userId },
      });

      if (addresses.length === 0) {
        await ctx.reply("You don't have any saved addresses.");
      } else {
        const addressText = addresses
          .map(
            (address) =>
              `<b>Address name</b>: ${address.address_name}\n<b>Address</b>: ${address.address}`
          )
          .join("\n\n");
        await ctx.replyWithHTML(addressText, {
          reply_markup: {
            inline_keyboard: addresses.map((address) => [
              {
                text: "See location",
                callback_data: `location_${address.id}`,
              },
            ]),
          },
        });
      }
    }
  }

  async onClickLocation(ctx: Context) {
    try {
      const actText: String = ctx.callbackQuery["data"];

      const address_id = Number(actText.split("_")[1]);
      const address = await this.addressModel.findByPk(address_id);

      await ctx.replyWithLocation(
        Number(address.location.split(",")[0]),
        Number(address.location.split(",")[1])
      );
    } catch (error) {
      console.error("onClikcLocation", error);
    }
  }

  async onCar(ctx: Context) {
    await ctx.reply(`MyCars`, {
      parse_mode: "HTML",
      ...Markup.keyboard([["My cars", "Add new car"]]).resize(),
    });
  }

  async addNewCar(ctx: Context) {
    const userId = ctx.from.id;
    const user = await this.botModel.findByPk(userId);

    if (!user) {
      await ctx.reply(`You have not registered before`, {
        parse_mode: "HTML",
        ...Markup.keyboard([["/start"]])
          .resize()
          .oneTime(),
      });
    } else {
      await this.carModel.create({
        user_id: userId,
        last_state: "car_number",
      });
      await ctx.reply(`Enter the you car number`, {
        parse_mode: "HTML",
        ...Markup.removeKeyboard(),
      });
    }
  }

  async myCars(ctx: Context) {
    const userId = ctx.from.id;
    const user = await this.botModel.findByPk(userId);
    if (!user) {
      await ctx.reply(`You have not registered before`, {
        parse_mode: "HTML",
        ...Markup.keyboard([["/start"]])
          .resize()
          .oneTime(),
      });
    } else {
      const cars = await this.carModel.findAll({
        where: {
          user_id: userId,
          last_state: "finish",
        },
      });
      if (cars.length == 0) {
        await ctx.reply("You don't have any saved car.");
      } else {
        const carText = cars
          .map(
            (car) =>
              `<b>Car number:</b> ${car.car_number}\n<b>Car model:</b> ${car.model}\n<b>Car color:</b> ${car.color}\n<b>Car year:</b> ${car.year}`
          )
          .join("\n\n");
        await ctx.replyWithHTML(carText);
      }
    }
  }

  async sendOtp(phone_number: string, OTP: string): Promise<boolean> {
    const user = await this.botModel.findOne({ where: { phone_number } });
    if (!user || !user.status) {
      return false;
    }
    await this.bot.telegram.sendChatAction(user.user_id, "typing");

    await this.bot.telegram.sendMessage(
      user.user_id,
      "Verify OTP code: " + OTP
    );
    return true;
  }
  haversine(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371;

    const toRadians = (degree: number): number => degree * (Math.PI / 180);
    const lat1Rad = toRadians(lat1);
    const lat2Rad = toRadians(lat2);
    const deltaLat = toRadians(lat2 - lat1);
    const deltaLon = toRadians(lon2 - lon1);

    const a =
      Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
      Math.cos(lat1Rad) *
        Math.cos(lat2Rad) *
        Math.sin(deltaLon / 2) *
        Math.sin(deltaLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c;

    return distance;
  }
}
