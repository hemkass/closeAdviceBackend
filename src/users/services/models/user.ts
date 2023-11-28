import { EntityBase } from '@/core/entityBase';

export class User extends EntityBase {
  id?: number;
  email: string;
  alias: string;
  password: string;
}
