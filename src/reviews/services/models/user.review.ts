import { EntityBase } from '@/core/entityBase';

export class UserReview extends EntityBase {
  id?: number;
  idMovie?: number | null;
  idUser: number;
  idReview: number;
  review?: Object;
}
