import { HttpException, HttpStatus } from "@nestjs/common";

export class UserExist extends HttpException {
    constructor(error: string) {
        super(error, HttpStatus.CONFLICT);
    }
}