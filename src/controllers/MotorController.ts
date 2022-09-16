import { Request, Response } from 'express';
import { IMotorcycle } from '../interfaces/IMotorcycle';
import { IService } from '../interfaces/IService';

class MotorController {
  constructor(private _motorService: IService<IMotorcycle>) {}

  public async create(req: Request, res: Response) {
    const obj = req.body;
    console.log('aqui');
    
    const newMotor = await this._motorService.create(obj);

    res.status(201).json(newMotor);
  }
}

export default MotorController;