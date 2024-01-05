import { EntityBase } from '@/core/entityBase';

export class Movie extends EntityBase {
  id?: number;
  idIMBD?: number | null;
  originalLanguage: string;
  originalTitle?: string | null;
  overview?: string | null;
  posterPath?: string | null;
  releaseDate?: Date | null;
  viewDate?: Date | null;
  rating?: number | null;
}
