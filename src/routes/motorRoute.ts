import 'express-async-errors';
import { Router } from 'express';
import MotorcycleModel from '../models/MotorcycleModel';
import MotorcycleService from '../services/MotorcycleService';
import MotorController from '../controllers/MotorController';

const motorRoute = Router();

const model = new MotorcycleModel();
const service = new MotorcycleService(model);
const controller = new MotorController(service);

motorRoute.get('/', (req, res) => controller.read(req, res));
motorRoute.post('/', (req, res) => controller.create(req, res));
motorRoute.get('/:id', (req, res) => controller.readOne(req, res));
motorRoute.put('/:id', (req, res) => controller.update(req, res));
motorRoute.delete('/:id', (req, res) => controller.delete(req, res));

export default motorRoute;
