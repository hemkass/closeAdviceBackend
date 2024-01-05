import { Genre } from './models/genre';

export interface IGenresService {
  create(genre: Genre): Promise<Genre>;
  isGenreExistingByIdIMBD(idIMBD: number): Promise<boolean>;
  getGenreByIdIMBD(idIMBD: number): Promise<Genre>;
}
