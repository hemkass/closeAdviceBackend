import { EntityBase } from '@/core/entityBase';

export class Genre extends EntityBase {
  id?: number;
  label: string;
  idIMBD: string;
}
