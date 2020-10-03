import { Body, Controller, Post, Res } from "@nestjs/common";
import { Response } from "express";
import {sign, verify} from 'jsonwebtoken';
import { IDBCreateUserDTO, IDBUserWithPasswordDTO } from "src/db/entities/user";
import { AppService } from "./app.service";

@Controller("user")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post("/register")
  async register(@Res() response: Response, @Body() params: IDBCreateUserDTO) {
    const res = await this.appService.createUser(params);
    response.status(res.status);
    response.json(res.json);
  }

  @Post("/login")
  async login(@Res() response: Response, @Body() params: IDBUserWithPasswordDTO) {
    const res  = await this.appService.loginUser(params);
    response.status(res.status);
    response.json(res.json);
  }
}
