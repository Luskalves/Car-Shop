import { Request, Response } from 'express';
import { IMotorcycle } from '../interfaces/IMotorcycle';
import { IService } from '../interfaces/IService';

class MotorController {
  constructor(private _motorService: IService<IMotorcycle>) {}

  public async read(_req: Request, res: Response) {
    const motors = await this._motorService.read();

    return res.status(200).json(motors);
  }

  public async create(req: Request, res: Response) {
    const obj = req.body;
    console.log('aqui');
    
    const newMotor = await this._motorService.create(obj);

    res.status(201).json(newMotor);
  }

  public async readOne(req: Request, res: Response) {
    const { id } = req.params;
    const motor = await this._motorService.readOne(id);

    res.status(200).json(motor);
  }

  public async update(req: Request, res: Response) {
    const { id } = req.params;
    const obj = req.body;

    const updatedMotor = await this._motorService.updateOne(id, obj);

    res.status(200).json(updatedMotor);
  }

  public async delete(req: Request, res: Response) {
    const { id } = req.params;

    await this._motorService.delete(id);

    res.sendStatus(204);
  }
}

export default MotorController;