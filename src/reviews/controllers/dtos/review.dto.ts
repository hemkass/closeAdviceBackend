import { EntityBaseDTO } from '@/core/dtos/entity.base.dto';
import { IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ReviewDTO extends EntityBaseDTO {
  @Expose()
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  id?: number;

  @Expose()
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  idMovie?: number;

  @Expose()
  @ApiProperty()
  @IsNumber()
  idReview: number;

  @ApiProperty()
  @Expose()
  @IsString()
  @MaxLength(3000)
  comment: string;
}
