import { IsNotEmpty, IsString } from "class-validator";
export interface IDBUser {
  id: string;
  login: string;
  password: string;
}
export class IDBCreateUserDTO {
  @IsNotEmpty()
  @IsString()
  login: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
