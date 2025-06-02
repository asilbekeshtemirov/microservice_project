import { Injectable } from '@nestjs/common';
import { UserClient } from './user.client';
import { CreateUserDto } from './dto/create.user';
import { UpdateUserDto } from './dto/update.user.dto';


@Injectable()
export class UserService {
    constructor(private readonly client: UserClient) { }

    getAll() {
        return this.client.getAll();
    }

    create(payload: CreateUserDto) {
        return this.client.create(payload);
    }

    update(payload: UpdateUserDto & { id: number }) {
      return this.client.update(payload);
    }
    

    delete(id: number) {
        return this.client.delete({ id });
    }
}
