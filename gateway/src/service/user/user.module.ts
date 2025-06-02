import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { UserClient } from "./user.client";

@Module({
    controllers: [UserController],
    providers: [UserService, UserClient]
})
export class UserModule { }