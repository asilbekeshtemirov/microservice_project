import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'Smartphone', description: 'Mahsulot nomi' })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ example: 299, description: 'Mahsulot narxi' })
  @IsNumber()
  readonly price: number;

  @ApiProperty({ example: '64f7c6b8a1234567890abcdef', description: 'Category ID' })
  @IsString()
  @IsNotEmpty()
  readonly categoryId: string;
}
