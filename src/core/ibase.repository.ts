import { CloseAdviceException } from './exceptions/closeAdviceException';

export interface IBaseRepository<T> {
  create(entity: T): Promise<T>;
  getById(id: number): Promise<T>;
  getAll(): Promise<T[]>;
  update(entity: Partial<T>): Promise<T>;
  exist(id: number): Promise<boolean>;
  delete(idUser: number): Promise<void>;
}
