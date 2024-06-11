import { Inject, Injectable, NotImplementedException } from '@nestjs/common';
import { promisify } from 'util';
import { User } from './models/user';
import { BaseService } from '@/core/base.service';
import { IUsersService } from '@/users/services/iusers.service';
import { ArgumentRequireException } from '@/core/exceptions/argument.require.exception';
import { HandleString } from 'utils/handle.string';
import { CryptingData } from 'utils/cryptingData';
import { UsersRepository } from '../repositories/users.repository';
import { IUsersRepository } from '../repositories/iusers.repository';
import { UserAlreadyExistsException } from '../exceptions/user.already.existing.exception';

@Injectable()
export class UsersService extends BaseService<User> implements IUsersService {
  constructor(
    @Inject(UsersRepository)
    private usersRepository: IUsersRepository,
  ) {
    super(usersRepository);
  }
  async create(user: User): Promise<User> {
    if (!user?.email || !user.alias) {
      throw new ArgumentRequireException('Email and alias required');
    }

    // email have to be unique
    await this.throwIfEmailAlreadyExists(user.email);

    user.alias = HandleString.capitalizeFirstLetter(user.alias);

    const hashedPassword = await CryptingData.generateHashedPassword(
      user.password,
    );
    user.password = hashedPassword;

    const newUser = await this.usersRepository.create(user);

    return newUser;
  }

  async getById(idUser: number): Promise<User> {
    return super.getById(idUser);
  }

  async getUserByEmail(email: string): Promise<User> {
    if (!email) {
      throw new ArgumentRequireException('Email Mandatory');
    }
    const user = await this.usersRepository.getByEmail(email);

    return user;
  }

  async throwIfEmailAlreadyExists(email: string): Promise<void> {
    const existence = await this.usersRepository.emailAlreadyExists(email);
    if (existence) {
      throw new UserAlreadyExistsException(`Email ${email} is already taken`);
    }
  }

  getAll(): Promise<User[]> {
    return super.getAll();
  }

  delete(id: number): Promise<void> {
    return this.usersRepository.delete(id);
  }
  update(entity: Partial<User>): Promise<User> {
    return this.usersRepository.update(entity);
  }
  exist(id: number): Promise<boolean> {
    throw new NotImplementedException('Method not implemented.');
  }
}
