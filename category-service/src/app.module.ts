import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryModule } from './modules';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/category_service'),
    CategoryModule,
  ],
})
export class AppModule {}
