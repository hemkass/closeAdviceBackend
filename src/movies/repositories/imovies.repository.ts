import { IBaseRepository } from '@/core/ibase.repository';
import { Movie } from '../services/models/movie';

export interface IMoviesRepository extends IBaseRepository<Movie> {
  idIMBDAlreadyExists(idIMBD: number): Promise<boolean>;
  getByIdIMBD(idIMBD: number): Promise<Movie>;
}
