import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_FILTER } from "@nestjs/core";
import { SequelizeModule } from "@nestjs/sequelize";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import pg from "pg";
import { AuthModule } from "./auth/auth.module";
import { ResetPassword } from "./auth/reset-password/reset-password.model";
import { ResetPasswordModule } from "./auth/reset-password/reset-password.module";
import { Building } from "./building/building.model";
import { BuildingModule } from "./building/building.module";
import { AllExceptionsFilter } from "./filters/all-exceptions.filter";
import { User } from "./users/users.model";
import { UsersModule } from "./users/users.module";

@Module({
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
  imports: [
    ConfigModule.forRoot({
      envFilePath: [".env"],
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "/src/", "static"),
    }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [Building, User, ResetPassword],
      autoLoadModels: true,
      dialectModule: pg,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    }),
    UsersModule,
    AuthModule,
    ResetPasswordModule,
    BuildingModule,
  ],
})
export class AppModule {}
