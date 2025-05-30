import { IsOptional, IsString, Length } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCategoryDto {
  @ApiPropertyOptional({
    example: 'Maishiy texnika',
    description: 'Kategoriya nomining yangi qiymati (ixtiyoriy).',
  })
  @IsOptional()
  @IsString()
  @Length(2, 50)
  name?: string;
}
