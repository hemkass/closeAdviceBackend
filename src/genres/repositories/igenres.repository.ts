import { IBaseRepository } from '@/core/ibase.repository';
import { Genre } from '../services/models/genre';

export interface IGenresRepository extends IBaseRepository<Genre> {}
