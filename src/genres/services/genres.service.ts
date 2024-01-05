import { Inject, Injectable } from '@nestjs/common';
import { IGenresService } from './igenres.service';
import { GenresRepository } from '../repositories/genres.repository';
import { IGenresRepository } from '../repositories/igenres.repository';
import { Genre } from './models/genre';

@Injectable()
export class GenresService implements IGenresService {
  constructor(
    @Inject(GenresRepository)
    private genresRepository: IGenresRepository,
  ) {}

  async create(genre: Genre): Promise<Genre> {
    const isExisting = await this.isGenreExistingByIdIMBD(genre.idIMBD);
    if (isExisting) {
      return await this.genresRepository.getGenreByIdIMBD(genre.idIMBD);
    } else return await this.genresRepository.create(genre);
  }

  async isGenreExistingByIdIMBD(idIMBD: number): Promise<boolean> {
    return this.genresRepository.IsGenreExistingByIdIMBD(idIMBD);
  }

  async getGenreByIdIMBD(idIMBD: number): Promise<Genre> {
    return this.genresRepository.getGenreByIdIMBD(idIMBD);
  }
}
