import { HttpStatus, Injectable } from "@nestjs/common";
import { DbService } from "src/db/db.service";
import { IDBCreateUserDTO, IDBUserWithPasswordDTO } from "src/db/entities/user";
import { InternalServerError } from "src/db/errors/internal-server";
import { UserAlreadyExistsError } from "src/db/errors/user-not-exist";
import { UserNotFoundError } from "src/db/errors/user-not-found";

export interface IAppServiceResponse {
  status: HttpStatus;
  json: {
    result: any;
    error?: string;
    code?: number;
  };
}

@Injectable()
export class AppService {
  constructor(private readonly dbService: DbService) {}

  async createUser(params: IDBCreateUserDTO): Promise<IAppServiceResponse> {
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
              error: "Error: #001",
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

  async loginUser(
    params: IDBUserWithPasswordDTO,
  ): Promise<IAppServiceResponse> {
    try {
      const result = await this.dbService.userWithPassword(params);
      return {
        status: HttpStatus.OK,
        json: {
          result,
        },
      };
    } catch (e) {
      switch (e.name) {
        case InternalServerError.name:
          return {
            status: e.status,
            json: {
              result: false,
              error: "Error: #002",
            },
          };
        case UserNotFoundError.name:
          return {
            status: e.status,
            json: {
              result: false,
              error: "Username or password is incorrect",
              code: 13,
            },
          };
      }
    }
  }
}
