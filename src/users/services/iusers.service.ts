import { IBaseService } from '@/core/ibase.service';
import { User } from './models/user';

export interface IUsersService extends IBaseService<User> {
  getUserByEmail(email: string): Promise<User>;
}
