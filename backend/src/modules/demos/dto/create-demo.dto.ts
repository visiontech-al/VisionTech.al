import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsUrl,
  MaxLength,
} from 'class-validator';

export class CreateDemoDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsUrl()
  @IsOptional()
  @MaxLength(500)
  demoUrl?: string;

  @IsUrl()
  @IsOptional()
  @MaxLength(500)
  thumbnailUrl?: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  category?: string;
}

