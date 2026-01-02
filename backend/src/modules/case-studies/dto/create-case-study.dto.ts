import { IsString, IsNotEmpty, IsOptional, IsUrl, MaxLength } from 'class-validator';

export class CreateCaseStudyDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  clientName: string;

  @IsString()
  @IsNotEmpty()
  challenge: string;

  @IsString()
  @IsNotEmpty()
  solution: string;

  @IsString()
  @IsNotEmpty()
  results: string;

  @IsUrl()
  @IsOptional()
  @MaxLength(500)
  imageUrl?: string;
}

