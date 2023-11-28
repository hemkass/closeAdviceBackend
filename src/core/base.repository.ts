import { CloseAdviceException } from './exceptions/closeAdviceException';
import { FindAllParams } from './find.all.params';
import { IBaseRepository } from './ibase.repository';

export abstract class BaseRepository<T> implements IBaseRepository<T> {
  protected _model;

  constructor(model: any) {
    this._model = model;
  }

  async getAll(params?: FindAllParams) {
    return await this._model.findMany(params);
  }

  abstract create(entity: T): Promise<T>;

  abstract getById(id: number): Promise<T>;

  async findById<TException extends CloseAdviceException>(
    id: number,
    exception: new (msg: string) => TException,
  ): Promise<T> {
    const entity = await this._model.findUnique({ where: { id: id } });
    if (!entity?.id) {
      throw new exception(`No entity found with id ${id}`);
    } else return entity;
  }

  abstract delete(id: number): Promise<void>;

  abstract update(entity: Partial<T>): Promise<T>;

  abstract exist(id: number): Promise<boolean>;
}
