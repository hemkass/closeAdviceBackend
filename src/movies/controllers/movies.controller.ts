// common
import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  Inject,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';

//services
import { MoviesService } from '../services/movies.service';
import { IMoviesService } from '../services/imovies.service';

// exceptions
import { ArgumentRequireException } from '@/core/exceptions/argument.require.exception';
import { MovieNotFoundException } from '../exceptions/movie.not.found.exception';
import { MovieAlreadyExistsException } from '../exceptions/movie.already.existing.exception';

//swagger
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

//models and Dtos
import { Movie } from '../services/models/movie';
import { MovieDTO } from './dtos/movie.dto';

@ApiTags('movies')
@Controller('movies')
export class MoviesController {
  constructor(@Inject(MoviesService) private moviesService: IMoviesService) {}

  @ApiBody({
    type: MovieDTO,
  })
  @ApiOperation({ summary: 'Create a new movie' })
  @Post('/save')
  async create(@Body() movie: MovieDTO) {
    try {
      return await this.moviesService.create(movie);
    } catch (error) {
      if (error instanceof MovieAlreadyExistsException) {
        throw new ConflictException();
      }
      if (error instanceof ArgumentRequireException) {
        throw new BadRequestException();
      }
      console.error(error);
      throw new InternalServerErrorException();
    }
  }
  @ApiOperation({ summary: 'fetch movie detail from IMDB' })
  @Get('/:label')
  async getUserById(@Param('label') label: string): Promise<Movie> {
    try {
      return await this.moviesService.fetchMovieInIMDB(label);
    } catch (error) {
      console.error(error);
      if (error instanceof MovieNotFoundException) {
        throw new NotFoundException();
      }
      throw new InternalServerErrorException();
    }
  }
  @ApiOperation({ summary: 'get all movies saved' })
  @Get('/saved/all')
  async getAllMovieSaved(): Promise<Movie[]> {
    try {
      return await this.moviesService.getAll();
    } catch (error) {
      console.error(error);
      if (error instanceof MovieNotFoundException) {
        throw new NotFoundException();
      }
      throw new InternalServerErrorException();
    }
  }
}
