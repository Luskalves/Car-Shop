import 'express-async-errors';
import { Router } from 'express';
import CarModel from '../models/CarModel';
import CarService from '../services/CarService';
import CarController from '../controllers/CarController';

const carsRoute = Router();

const model = new CarModel();
const service = new CarService(model);
const controller = new CarController(service);

carsRoute.post('/', (req, res) => controller.create(req, res));

export default carsRoute;