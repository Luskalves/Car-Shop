import { model as mongooseModel, Schema } from 'mongoose';
import { IMotorcycle } from '../interfaces/IMotorcycle';
import MongoModel from './MongoModel';

const motorcycleSchema = new Schema<IMotorcycle>({
  buyValue: Number,
  category: String,
  color: String,
  engineCapacity: Number,
  model: String,
  status: Boolean,
  year: Number,
}, { versionKey: false });

class MotorcycleModel extends MongoModel<IMotorcycle> {
  constructor(model = mongooseModel('Motorcycles', motorcycleSchema)) {
    super(model);
  }
}

export default MotorcycleModel;
