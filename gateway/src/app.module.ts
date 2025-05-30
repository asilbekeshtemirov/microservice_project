import { Module } from '@nestjs/common';
import { CategoryModule, ProductModule  } from './service'; 

@Module({
  imports: [
    CategoryModule, 
    ProductModule, 
  ],
})
export class AppModule {}
