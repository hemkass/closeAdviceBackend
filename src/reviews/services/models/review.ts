import { EntityBase } from '@/core/entityBase';

export class Review extends EntityBase {
  id?: number;
  idMovie: number | null;
  idUser?: number;
  comment: string;
}
