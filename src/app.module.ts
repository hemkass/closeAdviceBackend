import { ReviewsController } from './reviews/controllers/reviews.controller';
import { UsersModule } from '@users/users.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersController } from '@users/controllers/users.controller';
import corsConfig from 'config/corsConfig';
import { ConfigModule } from '@nestjs/config';
import { AuthenticationModule } from './authentication/authentication.module';
import { MoviesModule } from './movies/movies.module';
import { GenresModule } from './genres/genres.module';
import { MoviesController } from './movies/controllers/movies.controller';
import { ReviewsModule } from './reviews/reviews.module';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
      load: [corsConfig],
    }),
    UsersModule,
    AuthenticationModule,
    MoviesModule,
    GenresModule,
    ReviewsModule,
  ],
  controllers: [
    AppController,
    UsersController,
    MoviesController,
    ReviewsController,
  ],
  providers: [AppService],
})
export class AppModule {}
