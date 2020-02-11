import {ApiProperty} from '@nestjs/swagger';
import { RecommendationEntryResponse } from './recommendation-entry.response';

export class RecommendationFindResponse {
    @ApiProperty()
    public total: number;

    @ApiProperty()
    public nextCursor: string | null;

    @ApiProperty( { type: RecommendationEntryResponse, isArray: true } )
    public items: RecommendationEntryResponse[];
}