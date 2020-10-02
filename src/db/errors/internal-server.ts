import { HttpStatus } from "@nestjs/common";

export class InternalServerError extends Error {
  public static status = HttpStatus.INTERNAL_SERVER_ERROR;
}
