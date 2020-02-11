import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {Trim, Escape} from 'class-sanitizer';
import { IsString, IsDefined, Length } from 'class-validator';

export class RecommendationCreateDto {
    @ApiPropertyOptional()
    @Trim()
    @Escape()
    @IsString()
    @IsDefined()
    @Length(0, 16)
    public readonly from: string;

    @ApiProperty()
    @Trim()
    @Escape()
    @IsString()
    @IsDefined()
    @Length(1, 16)
    public readonly to: string;

    @ApiPropertyOptional()
    @Trim()
    @Escape()
    @IsString()
    @IsDefined()
    @Length(0, 2048)
    public readonly reason: string;
}