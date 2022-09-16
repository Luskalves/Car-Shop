import { isValidObjectId, Model, UpdateQuery } from 'mongoose';
import NotFound from '../errors/customErrors/NotFound';

import { IModel } from '../interfaces/IModel';

const ERROR_MESSAGE = 'Object not found';

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
    if (!isValidObjectId(_id)) throw new NotFound(ERROR_MESSAGE);
    return this._model.findById(_id);
  }

  async update(_id: string, obj: T): Promise<T | null> {
    if (!isValidObjectId(_id)) throw new NotFound(ERROR_MESSAGE);

    const updatedCar = await this._model.findByIdAndUpdate(
      { _id },
      { ...obj } as UpdateQuery<T>,
      { new: true },  
    );

    return updatedCar as unknown as T;
  }

  async delete(_id: string): Promise<T | null> {
    const exists = await this._model.findById(_id);
    
    if (!exists) throw new NotFound(ERROR_MESSAGE);

    return this._model.findByIdAndDelete(_id);
  }
}

export default MongoModel;
