import { Injectable, OnModuleInit } from "@nestjs/common";
import { resolve } from "path";
import * as pgPromise from "pg-promise";
import pg from "pg-promise/typescript/pg-subset";
import { IDBCreateUserDTO, IDBUser } from "./entities/user";
import { InternalServerError } from "./errors/internal-server";
import { UserAlreadyExistsError } from "./errors/user-not-exist";

@Injectable()
export class DbService implements OnModuleInit {
  private db: pgPromise.IDatabase<pg.IClient>;
  private queries: Record<string, pgPromise.QueryFile> = {};

  async onModuleInit(): Promise<void> {
    const pgp = pgPromise();
    this.db = pgp({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE_NAME,
    });

    this.queries["insertUser"] = new pgPromise.QueryFile(
      resolve(__dirname, "./sqls/insert-user.sql"),
    );
  }

  async createUser(options: IDBCreateUserDTO): Promise<IDBUser> {
    try {
      return await this.db.one(this.queries["insertUser"], options);
    } catch (e) {
      if (e.code === "23505") throw UserAlreadyExistsError;
      throw InternalServerError;
    }
  }
}
