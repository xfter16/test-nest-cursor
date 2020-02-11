import { ApiPropertyOptional } from '@nestjs/swagger';
import {Trim, Escape, ToInt} from 'class-sanitizer';
import { IsString, Length, IsInt, Min, Max } from 'class-validator';

export class RecommendationFindDto {
    @ApiPropertyOptional()
    @Trim()
    @Escape()
    @IsString()
    @Length(0, 30)
    public readonly id: string;

    @ApiPropertyOptional()
    @ToInt()
    @IsInt()
    @Min(0)
    @Max(100)
    public readonly perPage: number;

    @ApiPropertyOptional()
    @Trim()
    @Escape()
    @IsString()
    @Length(0, 30)
    public readonly cursor: string;
}