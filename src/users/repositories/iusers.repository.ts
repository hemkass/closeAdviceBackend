import { IBaseRepository } from '@/core/ibase.repository';
import { User } from '../services/models/user';

export interface IUsersRepository extends IBaseRepository<User> {
  emailAlreadyExists(email: string): Promise<boolean>;
  getByEmail(email: string): Promise<User>;
}
