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

  public async readOne(req: Request, res: Response<ICar>) {
    const { id } = req.params;
    const car = await this._carService.readOne(id);

    return res.status(200).json(car);
  }

  public async update(req: Request, res: Response<ICar>) {
    const { id } = req.params;
    const obj = req.body;

    const updatedCar = await this._carService.updateOne(id, obj);

    return res.status(200).json(updatedCar);
  }

  public async delete(req: Request, res: Response<ICar>) {
    const { id } = req.params;

    await this._carService.delete(id);

    res.sendStatus(204);
  }
}

export default CarController;
