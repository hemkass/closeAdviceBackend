import { Genre } from './models/genre';

export interface IGenresService {
  create(genre: Genre): Promise<Genre>;
}
