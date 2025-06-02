import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create.user";
import { UpdateUserDto } from "./dto/update.user.dto";


@Controller('users')
export class UserController {
    constructor(private readonly service: UserService) { }

    @Get()
    async getAll() {
        return await this.service.getAll();
    }

    @Post()
    async create(@Body() body: CreateUserDto) {
        return this.service.create(body);
    }

    @Put(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() body: UpdateUserDto,
    ) {
        return this.service.update({ ...body, id });
    }


    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return this.service.delete(id);
    }
}
