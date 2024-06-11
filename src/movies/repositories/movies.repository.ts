import { Injectable, NotImplementedException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { IMoviesRepository } from './imovies.repository';
import { BaseRepository } from '@/core/base.repository';

import { ArgumentRequireException } from '@/core/exceptions/argument.require.exception';
import { Movie } from '../services/models/movie';
import { MovieNotFoundException } from '../exceptions/movie.not.found.exception';
import { MovieNotCreatedException } from '../exceptions/movie.not.created.exception';

@Injectable()
export class MoviesRepository
  extends BaseRepository<Movie>
  implements IMoviesRepository
{
  constructor(private prisma: PrismaService) {
    super(prisma.movie);
  }
  getAll(): Promise<Movie[]> {
    return super.getAll({ where: { isDeleted: false } });
  }
  getById(id: number): Promise<Movie> {
    return super.findById(id, MovieNotFoundException);
  }

  async create(movie: Movie): Promise<Movie> {
    const newMovie = await this.prisma.movie.create({ data: movie });

    if (!newMovie?.id) {
      throw new MovieNotCreatedException('Movie not created');
    }
    return newMovie;
  }

  async exist(idMovie: number): Promise<boolean> {
    const movie = await this.prisma.movie.count({
      where: { AND: { id: idMovie, isDeleted: false } },
    });
    return movie === 1;
  }

  async idIMBDAlreadyExists(idIMBD: number): Promise<boolean> {
    const movie = await this.prisma.movie.count({
      where: { AND: { idIMBD: idIMBD, isDeleted: false } },
    });
    return movie >= 1;
  }

  async getByIdIMBD(idIMBD: number): Promise<Movie> {
    const movie = await this.prisma.movie.findFirst({
      where: { AND: { idIMBD: idIMBD, isDeleted: false } },
    });

    if (!movie) {
      throw new MovieNotFoundException(
        `No movie for this IdIMBD ${idIMBD} found`,
      );
    }
    return movie;
  }

  async update(data: Partial<Movie>): Promise<Movie> {
    if (!data?.id) {
      throw new ArgumentRequireException(`Id mandatory`);
    }
    data.updateDate = new Date();
    const movie = await this.prisma.movie.update({
      where: { id: data.id },
      data: data,
    });

    if (!movie?.id || movie?.isDeleted) {
      throw new MovieNotFoundException(`User ${data.id} not found`);
    } else {
      return movie;
    }
  }

  async delete(idMovie: number): Promise<void> {
    await this.prisma.movie.update({
      where: { id: idMovie },
      data: { updateDate: new Date(), deleteDate: new Date(), isDeleted: true },
    });
  }
}
