export interface IbaseRepository<T> {
  create(entity: T): Promise<T>;
  getById(id: number): Promise<T>;
  getAll(): Promise<T>;
  update(id: number): Promise<T>;
  exist(id: number): Promise<T>;
}
