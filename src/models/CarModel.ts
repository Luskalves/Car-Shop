import { model as mongooseModel, Schema } from 'mongoose';
import { ICar } from '../interfaces/ICar';
import MongoModel from './MongoModel';

const carSchema = new Schema<ICar>({
  doorsQty: Number,
  seatsQty: Number,
  model: String,
  buyValue: Number,
  color: String,
  status: Boolean,
  year: Number,
});

class CarModel extends MongoModel<ICar> {
  constructor(model = mongooseModel('Cars', carSchema)) {
    super(model);
  }
}

export default CarModel;