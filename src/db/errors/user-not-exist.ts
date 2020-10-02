import { HttpStatus } from "@nestjs/common";

export class UserAlreadyExistsError extends Error {
  public static status = HttpStatus.BAD_REQUEST;
}
