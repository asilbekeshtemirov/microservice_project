import { Module } from '@nestjs/common';
import { CategoryModule, ProductModule  } from './service'; 
import { UserModule } from './service/user';

@Module({
  imports: [
    CategoryModule, 
    ProductModule,
    UserModule 
  ],
})
export class AppModule {}
