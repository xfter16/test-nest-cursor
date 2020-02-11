import { Controller, Post, HttpStatus, Response, Body, UsePipes, Get, Query, } from '@nestjs/common';
import { RecommendationService } from './recommendation.service';
import { ApiResponse } from '@nestjs/swagger';
import { Response as IResponse} from 'express';
import { RecommendationCreateResponse } from './responses/recommendation-create.response';
import { RecommendationCreateDto } from './dto/recommendation-create.dto';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { ICursorPage } from './recomendation.interfaces';
import { RecommendationFindDto } from './dto/recommendation-find.dto';
import { ValidationError } from 'src/errors/validation.error';
import { NotFoundError } from 'src/errors/not-found.error';
import { RecommendationFindResponse } from './responses/recommendation-find.response';
import * as _ from 'lodash';

@Controller('recommendations')
export class RecommendationController {
    private _cursors: ICursorPage; // если бы это не было тестовым заданием, сохранял бы в reddis
    constructor(private readonly recommendationService: RecommendationService) {
        this._cursors = {};
    }

    @Post('add')
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Ok',
        type: RecommendationCreateResponse,
        isArray: false,
    })
    @UsePipes(new ValidationPipe())
    public async add(@Body() createRecommendationDto: RecommendationCreateDto, @Response() res: IResponse): Promise<void> {

        const recommendations = await this.recommendationService.findByToCount(createRecommendationDto.to);
        const id = createRecommendationDto.to + '#' + (recommendations + 1).toString().padStart(6, '0');
        const recommendationData = {
            id,
            ...createRecommendationDto
        };
        const createResult = await this.recommendationService.create(recommendationData);
        res.status(200).json(createResult);
    }

    @Get('list')
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Ok',
        type: RecommendationCreateResponse,
        isArray: false,
    })
    @UsePipes(new ValidationPipe())
    public async list(@Query() findRecommendationDto: RecommendationFindDto, @Response() res: IResponse): Promise<void> {


        const { id, perPage, cursor } = findRecommendationDto;
        if (cursor) {
            res.status(200).json(await this._getRecommendationsByCursor(cursor));
        } else if (id && perPage) {
            res.status(200).json(await this._getRecommendationsById(id, perPage));
        } else {
            throw new ValidationError('Cannot find recommendations: need cursor or id + perPage fields');
        }
        console.log(this._cursors)
    
    }

    private async _getRecommendationsById(id, perPage): Promise<RecommendationFindResponse> {
        const recommendationCount = await this.recommendationService.findByToCount(id);
        if (!recommendationCount){
            throw new NotFoundError('Cannot find recommendations');
        }
        const recommendations = await this.recommendationService.findByTo(id, perPage);
        const nextCursor = recommendations[perPage] ? recommendations[perPage].id : null;
        if (nextCursor) {
            this._cursors[nextCursor] = {
                limit: perPage,
                to: id,
            };
        }
        
        return {
            total: recommendationCount,
            nextCursor,
            items: recommendations.map(recommendation => ({id: recommendation.id,  from: recommendation.from, reason: recommendation.reason})).slice(0, perPage),
        };
    }

    private async _getRecommendationsByCursor(cursor): Promise<RecommendationFindResponse> {
        const currentCursor = this._cursors[cursor];
        if (!currentCursor) {
            throw new ValidationError('Incorrect cursor');
        }
        const { to, limit } = currentCursor;
        const recommendationCount = await this.recommendationService.findByToCount(to);
        if (!recommendationCount){
            throw new NotFoundError('Cannot find recommendations');
        }
        const recommendations = await this.recommendationService.findByCursor(to, limit, cursor);
        const nextCursor = recommendations[limit] ? recommendations[limit].id : null;
        if (nextCursor) {
            this._cursors[nextCursor] = {
                limit,
                to,
            };
        }
        // delete this._cursors[cursor];
        return {
            total: recommendationCount,
            nextCursor,
            items: recommendations.map(recommendation => ({id: recommendation.id, from: recommendation.from, reason: recommendation.reason})).slice(0, limit),
        }
    }
}
