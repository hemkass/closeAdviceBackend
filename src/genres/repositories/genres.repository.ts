import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';

import { BaseRepository } from '@/core/base.repository';

import { ArgumentRequireException } from '@/core/exceptions/argument.require.exception';
import { IGenresRepository } from './igenres.repository';
import { Genre } from '../services/models/genre';
import { GenreNotFoundException } from '../exceptions/genre.not.found.exception';
import { GenreNotCreatedException } from '../exceptions/genre.not.created.exception';

@Injectable()
export class GenresRepository
  extends BaseRepository<Genre>
  implements IGenresRepository
{
  constructor(private prisma: PrismaService) {
    super(prisma.genre);
  }
  getAll(): Promise<Genre[]> {
    return super.getAll({ where: { isDeleted: false } });
  }
  getById(id: number): Promise<Genre> {
    return super.findById(id, GenreNotFoundException);
  }

  async create(genre: Genre): Promise<Genre> {
    const newGenre = await this.prisma.genre.create({ data: genre });
    if (!genre?.id) {
      throw new GenreNotCreatedException('Genre not created');
    }
    return newGenre;
  }

  async exist(idGenre: number): Promise<boolean> {
    const genre = await this.prisma.genre.count({
      where: { AND: { id: idGenre, isDeleted: false } },
    });
    return genre === 1;
  }

  async update(data: Partial<Genre>): Promise<Genre> {
    if (!data?.id) {
      throw new ArgumentRequireException(`Id mandatory`);
    }
    data.updateDate = new Date();
    const genre = await this.prisma.genre.update({
      where: { id: data.id },
      data: data,
    });

    if (!genre?.id || genre?.isDeleted) {
      throw new GenreNotFoundException(`Genre ${data.id} not found`);
    } else {
      return genre;
    }
  }

  async delete(idUser: number): Promise<void> {
    let absence: Partial<Genre> = { id: idUser };
    absence.updateDate = new Date();
    absence.deleteDate = new Date();
    absence.isDeleted = true;

    await this.prisma.genre.update({
      where: { id: idUser },
      data: absence,
    });
  }
}
