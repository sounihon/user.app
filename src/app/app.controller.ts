import { Body, Controller, Post, Res } from "@nestjs/common";
import { Response } from "express";
import { IDBCreateUserDTO } from "src/db/entities/user";
import { AppService } from "./app.service";

@Controller("user")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post("/register")
  async registerUser(
    @Res() response: Response,
    @Body() params: IDBCreateUserDTO,
  ) {
    const res = await this.appService.createUser(params);
    response.status(res.status);
    response.json(res.json);
  }
}
