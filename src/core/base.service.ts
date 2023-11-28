import { Inject } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { CloseAdviceException } from './exceptions/closeAdviceException';
import { IBaseService } from './ibase.service';
import { IBaseRepository } from './ibase.repository';

export abstract class BaseService<T> implements IBaseService<T> {
  constructor(
    @Inject(BaseRepository)
    private repository: IBaseRepository<T>,
  ) {}
  abstract create(entity: T): Promise<T>;

  async getAll(): Promise<T> {
    return await this.repository.getAll();
  }

  async getById(id: number): Promise<T> {
    return await this.repository.getById(id);
  }

  abstract delete(id: number): Promise<void>;

  abstract update(entity: Partial<T>): Promise<T>;

  abstract exist(id: number): Promise<boolean>;

  async checkExistenceOrThrow<TException extends CloseAdviceException>(
    id: number,
    exception: new (msg: string) => TException,
  ): Promise<void> {
    const exist = await this.exist(id);

    if (!exist) {
      throw new exception(`No entity found with id ${id}`);
    }
  }
}
