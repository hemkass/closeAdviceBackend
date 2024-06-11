export interface IBaseService<T> {
  create(entity: T | Partial<T>): Promise<T>;
  getById(id: number): Promise<T>;
  getAll(): Promise<T[]>;
  update(id: Partial<T>): Promise<T>;
  exist(id: number): Promise<boolean>;
  delete(id: number): Promise<void>;
}
