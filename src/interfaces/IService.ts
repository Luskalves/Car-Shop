export interface IService<T> {
  read(): Promise<T[] | []>,
  create(obj: unknown): Promise<T>,
  updateOne(id: string, obj: unknown): Promise<T>,
}