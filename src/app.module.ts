import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecommendationModule } from './recommendation/recommendation.module';
import { Recommendation } from './recommendation/recommendation.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(
      {
        "type": "mysql",
        "host": "localhost",
        "port": 5432,
        "username": "user",
        "password": "password",
        "database": "test",
        "entities": [Recommendation],
        "synchronize": true,
        "cli": {
          "migrationsDir": "./migrations"
        }
    }
    ),
    RecommendationModule,
  ],
})
export class AppModule {
}
