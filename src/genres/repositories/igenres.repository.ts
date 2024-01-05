import { IBaseRepository } from '@/core/ibase.repository';
import { Genre } from '../services/models/genre';

export interface IGenresRepository extends IBaseRepository<Genre> {
  IsGenreExistingByIdIMBD(idIMBD: number): Promise<boolean>;
  getGenreByIdIMBD(idIMBD: number): Promise<Genre>;
}
