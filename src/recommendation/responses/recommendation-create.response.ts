import {ApiProperty} from '@nestjs/swagger';

export class RecommendationCreateResponse {
    @ApiProperty()
    public id: string;

    @ApiProperty()
    public from: string;

    @ApiProperty()
    public to: string;

    @ApiProperty()
    public reason: string;

    @ApiProperty()
    public createdAt: Date;

    @ApiProperty()
    public updatedAt: Date;

    @ApiProperty()
    public deletedAt: Date;
}