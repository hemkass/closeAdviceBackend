import { Inject, Injectable, NotImplementedException } from '@nestjs/common';

import { BaseService } from '@/core/base.service';

import { MoviesRepository } from '../repositories/movies.repository';
import { IMoviesRepository } from '../repositories/imovies.repository';
import { Movie } from './models/movie';
import { IMoviesService } from './imovies.service';
import axios from 'axios';
import { MovieNotFoundException } from '../exceptions/movie.not.found.exception';

@Injectable()
export class MoviesService
  extends BaseService<Movie>
  implements IMoviesService
{
  constructor(
    @Inject(MoviesRepository)
    private moviesRepository: IMoviesRepository,
  ) {
    super(moviesRepository);
  }

  async fetchMovieInIMDB(label: string): Promise<Movie> {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.IMBD_KEY}&query=${label}&language=en-US&page=1`,
      );
      console.log(response);
      if (!response?.data) {
        throw new MovieNotFoundException('No movie found');
      }
      const movie: Movie = response.data;
      return movie;
    } catch (error) {
      console.error(error);
      throw new MovieNotFoundException('No movie found');
    }
  }

  async create(movie: Movie): Promise<Movie> {
    // idIMBD must to be unique
    if (movie.idIMBD) {
      const hasExistence = await this.IdIMBDAlreadyExists(movie.idIMBD);
      if (hasExistence) {
        return await this.getByIdIMBD(movie.idIMBD);
      }
    }
    const newMovie = await this.moviesRepository.create(movie);

    return newMovie;
  }

  async getById(idUser: number): Promise<Movie> {
    return super.getById(idUser);
  }

  async getByIdIMBD(idIMBD: number): Promise<Movie> {
    return await this.moviesRepository.getByIdIMBD(idIMBD);
  }

  async IdIMBDAlreadyExists(idIMBD: number): Promise<boolean> {
    return await this.moviesRepository.idIMBDAlreadyExists(idIMBD);
  }

  getAll(): Promise<Movie[]> {
    console.log('service');
    return super.getAll();
  }

  delete(id: number): Promise<void> {
    return this.moviesRepository.delete(id);
  }
  update(entity: Partial<Movie>): Promise<Movie> {
    return this.moviesRepository.update(entity);
  }
  exist(id: number): Promise<boolean> {
    throw new NotImplementedException('Method not implemented.');
  }
}
