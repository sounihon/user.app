import { HttpStatus, Injectable } from "@nestjs/common";
import { DbService } from "src/db/db.service";
import { IDBCreateUserDTO } from "src/db/entities/user";
import { InternalServerError } from "src/db/errors/internal-server";
import { UserAlreadyExistsError } from "src/db/errors/user-not-exist";

export interface ICreateUserResponse {
  status: HttpStatus;
  json: {
    result: boolean;
    error?: string;
    code?: number;
  };
}

@Injectable()
export class AppService {
  constructor(private readonly dbService: DbService) {}

  async createUser(params: IDBCreateUserDTO): Promise<ICreateUserResponse> {
    try {
      await this.dbService.createUser(params);
      return {
        status: HttpStatus.OK,
        json: {
          result: true,
        },
      };
    } catch (e) {
      switch (e.name) {
        case InternalServerError.name:
          return {
            status: e.status,
            json: {
              result: false,
              error: "Error: #12123123",
            },
          };
        case UserAlreadyExistsError.name:
          return {
            status: e.status,
            json: {
              result: false,
              error: "User already exists",
              code: 12,
            },
          };
      }
    }
  }
}
