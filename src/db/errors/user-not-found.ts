import { HttpStatus } from "@nestjs/common";

export class UserNotFoundError extends Error {
    public static status = HttpStatus.BAD_REQUEST;
}