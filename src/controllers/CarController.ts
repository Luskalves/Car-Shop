import { Request, Response } from 'express';
import { IService } from '../interfaces/IService';
import { ICar } from '../interfaces/ICar';

class CarController {
  constructor(private _carService: IService<ICar>) {}

  public async create(req: Request, res: Response<ICar>) {
    const car = req.body;

    const newCar = await this._carService.create(car);

    res.status(201).json(newCar);
  }
}

export default CarController;
