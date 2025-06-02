import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail } from "class-validator";

export class CreateUserDto {
    @ApiProperty({ type: "string", default: "Tom" })
    @IsString()
    name: string;

    @ApiProperty({ type: "string", default: "tom@gmail.com" })
    @IsEmail()
    email: string;
}
