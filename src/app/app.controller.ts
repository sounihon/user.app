import { Body, Controller, Param, Post, Res } from "@nestjs/common";
import { response, Response } from "express";
import {sign, verify} from 'jsonwebtoken';
import { IDBCreateUserDTO, IDBUserWithPasswordDTO, ILoginWithJwtDTO } from "src/db/entities/user";
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

  @Post("/login-jwt")
  async loginJWT(@Res() response: Response, @Body() Params: ILoginWithJwtDTO) {
    
  }
}
