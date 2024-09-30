import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { ComfortModule } from "./comfort/comfort.module";
import { RegionModule } from "./region/region.module";
import { DistrictModule } from "./district/district.module";
import { CategoriesModule } from "./categories/categories.module";
import { StadiumsModule } from "./stadiums/stadiums.module";

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
      models: [],
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
    StadiumsModule,
  ],
})
export class AppModule {}
