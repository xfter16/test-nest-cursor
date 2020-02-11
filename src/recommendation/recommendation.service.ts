import { Injectable } from '@nestjs/common';
import { Recommendation } from './recommendation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan } from 'typeorm';

@Injectable()
export class RecommendationService {
    constructor(
        @InjectRepository(Recommendation)
        private readonly recommendationRepository: Repository<Recommendation>,
    ) {}
    
    async create(recommendation: Recommendation): Promise<Recommendation|null> {
        const createdRecommendation = await this.recommendationRepository.create(recommendation);
        return this.recommendationRepository.save(createdRecommendation);
    }

    async findByToCount(to: string): Promise<number> {
        return await this.recommendationRepository.count({
            where: { to },
        });
    }

    async findByTo(to: string, limit: number): Promise<Recommendation[]> {
        return await this.recommendationRepository.find({
            where: { to },
            order: {
                id: 'ASC',
            },
            take: limit + 1,
        });
    }

    async findByCursor(to: string, limit: number, lastId: string): Promise<Recommendation[]> {
        return await this.recommendationRepository.find({
            where: {
                to,
                id: MoreThan(lastId),
            },
            order: {
                id: 'ASC',
            },
            take: limit + 1,
        });
    }
}
