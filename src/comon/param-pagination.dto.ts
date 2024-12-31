import { IsNumber, IsOptional, IsString } from 'class-validator';

export class ParamPaginationDto {
  page: number;

  limit: number;

  @IsString()
  sort: string;

  @IsString()
  @IsOptional() // keyword có thể không cần thiết (có thể để trống)
  keyword: string;
}
