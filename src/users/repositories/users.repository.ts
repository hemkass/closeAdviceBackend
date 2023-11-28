import { Injectable, NotImplementedException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { IUsersRepository } from './iusers.repository';
import { BaseRepository } from '@/core/base.repository';
import { User } from '../services/models/user';
import { ArgumentRequireException } from '@/core/exceptions/argument.require.exception';
import { UserNotCreatedException } from '../exceptions/user.not.created.exception';
import { UserNotFoundException } from '../exceptions/user.not.found.exception';

@Injectable()
export class UsersRepository
  extends BaseRepository<User>
  implements IUsersRepository
{
  constructor(private prisma: PrismaService) {
    super(prisma.user);
  }
  getAll(): Promise<User[]> {
    console.log('hey');
    return super.getAll({ where: { isDeleted: false } });
  }
  getById(id: number): Promise<User> {
    return super.findById(id, UserNotFoundException);
  }

  async create(user: User): Promise<User> {
    if (!user?.password) {
      throw new ArgumentRequireException('password mandatory');
    }
    const newUser = await this.prisma.user.create({ data: user });
    if (!newUser?.id) {
      throw new UserNotCreatedException('User not created');
    }
    return newUser;
  }

  async exist(idUser: number): Promise<boolean> {
    const user = await this.prisma.user.count({
      where: { AND: { id: idUser, isDeleted: false } },
    });
    return user === 1;
  }

  async emailAlreadyExists(email: string): Promise<boolean> {
    const user = await this.prisma.user.count({
      where: { AND: { email: email, isDeleted: false } },
    });
    return user >= 1;
  }

  async getByEmail(email: string): Promise<User> {
    if (!email) {
      throw new ArgumentRequireException('Email required');
    }
    const user = await this.prisma.user.findFirst({
      where: { AND: { email: email, isDeleted: false } },
    });

    if (!user) {
      throw new UserNotFoundException(`No user ${email} found`);
    }
    return user;
  }

  async update(data: Partial<User>): Promise<User> {
    if (!data?.id) {
      throw new ArgumentRequireException(`Id mandatory`);
    }
    data.updateDate = new Date();
    const user = await this.prisma.user.update({
      where: { id: data.id },
      data: data,
    });

    if (!user?.id || user?.isDeleted) {
      throw new UserNotFoundException(`User ${data.id} not found`);
    } else {
      return user;
    }
  }

  async delete(idUser: number): Promise<void> {
    let absence: Partial<User> = { id: idUser };
    absence.updateDate = new Date();
    absence.deleteDate = new Date();
    absence.isDeleted = true;

    await this.prisma.user.update({
      where: { id: idUser },
      data: absence,
    });
  }
}
