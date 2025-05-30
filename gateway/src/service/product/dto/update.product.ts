import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateProductDto {
  @ApiPropertyOptional({ example: 'Smartphone', description: 'Mahsulot nomi' })
  @IsString()
  @IsOptional()
  readonly name?: string;

  @ApiPropertyOptional({ example: 299, description: 'Mahsulot narxi' })
  @IsNumber()
  @IsOptional()
  readonly price?: number;

  @ApiPropertyOptional({ example: '64f7c6b8a1234567890abcdef', description: 'Category ID' })
  @IsString()
  @IsOptional()
  readonly categoryId?: string;
}
