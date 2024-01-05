import { EntityBaseDTO } from '@/core/dtos/entity.base.dto';
import { IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class MovieDTO extends EntityBaseDTO {
  @Expose()
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  id?: number;

  @Expose()
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  idIMBD?: number;

  @ApiProperty()
  @Expose()
  @IsString()
  originalLanguage: string;

  @ApiProperty()
  @IsString()
  @Expose()
  originalTitle: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  @IsString()
  @MaxLength(1000)
  overview: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  @IsString()
  posterPath: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  viewDate: Date | null;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  releaseDate: Date | null;
}
