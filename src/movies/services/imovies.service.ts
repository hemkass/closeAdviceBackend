import { IBaseService } from '@/core/ibase.service';
import { Movie } from './models/movie';

export interface IMoviesService extends IBaseService<Movie> {
  IdIMBDAlreadyExists(idIMBD: number): Promise<boolean>;
  getByIdIMBD(idIMBD: number): Promise<Movie>;
  fetchMovieInIMDB(label: string): Promise<Movie>;
}
