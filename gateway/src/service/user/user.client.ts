import { Injectable, OnModuleInit } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UserClient implements OnModuleInit {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'user_queue',
        queueOptions: {
          durable: false,
        },
      },
    });
  }

  async onModuleInit() {
    await this.client.connect();
  }

  async getAll() {
    return await firstValueFrom(this.client.send('get_users', ''));
  }

  async create(payload: any) {
    return await firstValueFrom(this.client.send('create_user', payload));
  }

  async update(payload: any) {
    return await firstValueFrom(this.client.send('update_user', payload));
  }
  

  async delete(payload: any) {
    return await firstValueFrom(this.client.send('delete_user', payload));
  }
}
