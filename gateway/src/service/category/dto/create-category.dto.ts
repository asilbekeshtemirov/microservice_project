import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({
    example: 'Elektronika',
    description: "Kategoriya nomi",
  })
  @IsString()
  @Length(2, 50)
  name: string;
}
