import { Request, Response } from 'express';
import { IService } from '../interfaces/IService';
import { ICar } from '../interfaces/ICar';

class CarController {
  constructor(private _carService: IService<ICar>) {}

  public async read(_req: Request, res: Response) {
    const cars = await this._carService.read();
    
    return res.status(200).json(cars);
  }

  public async create(req: Request, res: Response<ICar>) {
    const car = req.body;

    const newCar = await this._carService.create(car);

    res.status(201).json(newCar);
  }

  public async update(req: Request, res: Response<ICar>) {
    const { id } = req.params;
    const obj = req.body;

    const updatedCar = await this._carService.updateOne(id, obj);

    return res.status(200).json(updatedCar);
  }
}

export default CarController;
