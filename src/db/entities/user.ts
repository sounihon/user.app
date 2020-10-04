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

export class IDBUserWithPasswordDTO {
  @IsNotEmpty()
  @IsString()
  login: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class ILoginWithJwtDTO {

}