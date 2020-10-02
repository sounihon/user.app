import { config } from "dotenv";
config();

import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app/app.module";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      disableErrorMessages: true,
      forbidNonWhitelisted: true,
    }),
  );
  await app.listen(Number(process.env.SERVER_PORT));
}
bootstrap();
