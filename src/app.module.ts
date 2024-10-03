import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { ComfortModule } from "./comfort/comfort.module";
import { RegionModule } from "./region/region.module";
import { DistrictModule } from "./district/district.module";
import { CategoriesModule } from "./categories/categories.module";
import { StadiumsModule } from "./stadiums/stadiums.module";
import { Comfort } from "./comfort/models/comfort.model";
import { Region } from "./region/models/region.model";
import { District } from "./district/models/district.model";
import { Category } from "./categories/models/category.model";
import { Stadium } from "./stadiums/models/stadium.model";
import { UsersModule } from "./users/users.module";
import { User } from "./users/models/user.model";
import { MailModule } from "./mail/mail.module";
import { UserCardModule } from "./user_card/user_card.module";
import { UserWalletModule } from "./user_wallet/user_wallet.module";
import { UserCard } from "./user_card/models/user_card.model";
import { BotModule } from "./bot/bot.module";
import { TelegrafModule } from "nestjs-telegraf";
import { BOT_NAME } from "./bot/app.constants";
import { OrderModule } from "./order/order.module";
import { Order } from "./order/models/order.model";
import { AdminModule } from "./admin/admin.module";
import { Admin } from "./admin/models/admin.model";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true,
    }),
    TelegrafModule.forRootAsync({
      botName: BOT_NAME,
      useFactory: () => ({
        token: process.env.BOT_TOKEN,
        include: [BotModule],
        middlewares: [],
      }),
    }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      username: process.env.PG_USER,
      password: process.env.PG_PASS,
      database: process.env.PG_DB,
      models: [
        Comfort,
        Region,
        District,
        Category,
        Stadium,
        User,
        UserCard,
        Order,
        Admin,
      ],
      sync: { alter: true },
      autoLoadModels: true,
      synchronize: true,
      logging: false,
    }),
    ComfortModule,
    RegionModule,
    DistrictModule,
    CategoriesModule,
    StadiumsModule,
    UsersModule,
    MailModule,
    UserCardModule,
    UserWalletModule,
    BotModule,
    OrderModule,
    AdminModule,
  ],
})
export class AppModule {}
