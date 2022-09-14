import { Model } from 'mongoose';

import { IModel } from '../interfaces/IModel';

abstract class MongoModel<T> implements IModel<T> {
  protected _model: Model<T>;

  constructor(model: Model<T>) {
    this._model = model;
  }

  async create(obj: T): Promise<T> {
    return this._model.create({ ...obj });
  }
  async read(): Promise<T[]> {
    const response = await this._model.find();
    return response;
  }
  async readOne(_id: string): Promise<T | null> {
    if (!_id) return null;
    return this._model.findById(_id);
  }
  async update(_id: string, obj: T): Promise<T | null> {
    if (!_id || !obj) return null;
    return this._model.findById({ id: _id });
  }
  async delete(_id: string): Promise<T | null> {
    if (!_id) return null;
    return this._model.findById(_id);
  }
}

export default MongoModel;