import { PrismaModule } from '@/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { MoviesController } from './controllers/movies.controller';
import { MoviesService } from './services/movies.service';
import { MoviesRepository } from './repositories/movies.repository';

@Module({
  imports: [PrismaModule],
  controllers: [MoviesController],
  providers: [MoviesService, MoviesRepository],
  exports: [MoviesService],
})
export class MoviesModule {}
