import {ApiProperty} from '@nestjs/swagger';

export class RecommendationEntryResponse {
    @ApiProperty()
    public id: string;

    @ApiProperty()
    public from: string;

    @ApiProperty()
    public reason: string;
}