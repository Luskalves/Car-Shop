export interface IService<T> {
  read(): Promise<T[] | []>,
  create(obj: unknown): Promise<T>,
  readOne(id: string): Promise<T>,
  updateOne(id: string, obj: unknown): Promise<T>,
  delete(id: string): Promise<void>,
}