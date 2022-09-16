import 'express-async-errors';
import { Router } from 'express';
import MotorcycleModel from '../models/MotorcycleModel';
import MotorcycleService from '../services/MotorcycleService';
import MotorController from '../controllers/MotorController';

const motorRoute = Router();

const model = new MotorcycleModel();
const service = new MotorcycleService(model);
const controller = new MotorController(service);

motorRoute.post('/', (req, res) => controller.create(req, res));

export default motorRoute;
