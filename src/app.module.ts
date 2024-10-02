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

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true,
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
  ],
})
export class AppModule {}
