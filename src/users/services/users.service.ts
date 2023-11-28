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

  async throwIfEmailAlreadyExists(
    email: string,
    idUser?: bigint,
  ): Promise<void> {
    const existence = await this.usersRepository.isEmailAlreadyExisting(
      email,
      idUser,
    );
    if (existence) {
      throw new UserAlreadyExistsException(`Email ${email} is already taken`);
    }
  }

  getAll(): Promise<User> {
    throw new NotImplementedException('Method not implemented.');
  }

  delete(id: number): Promise<void> {
    throw new NotImplementedException('Method not implemented.');
  }
  update(entity: Partial<User>): Promise<User> {
    throw new NotImplementedException('Method not implemented.');
  }
  exist(id: number): Promise<boolean> {
    throw new NotImplementedException('Method not implemented.');
  }
}
