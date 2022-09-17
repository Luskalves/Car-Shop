import { IMotorcycle, motorZodSchema } from '../interfaces/IMotorcycle';
import { IService } from '../interfaces/IService';
import { IModel } from '../interfaces/IModel';
import BadRequest from '../errors/customErrors/BadRequest';
import NotFound from '../errors/customErrors/NotFound';

const ERROR_MESSAGE = 'Object not found';
const BAD_REQUEST = 'Bad Request';
const ERROR_LENGTH_MESSAGE = 'Id must have 24 hexadecimal characters';

class MotorcycleService implements IService<IMotorcycle> {
  constructor(private _motorModel: IModel<IMotorcycle>) {}

  public async read(): Promise<[] | IMotorcycle[]> {
    const motorcycles = await this._motorModel.read();

    return motorcycles;
  }
  public create(obj: unknown): Promise<IMotorcycle> {
    const parsed = motorZodSchema.safeParse(obj);

    if (!parsed.success) throw new BadRequest(BAD_REQUEST);

    return this._motorModel.create(parsed.data as IMotorcycle);
  }

  public async readOne(id: string): Promise<IMotorcycle> {
    if (id.length !== 24) throw new BadRequest(ERROR_LENGTH_MESSAGE);
    
    const motor = await this._motorModel.readOne(id);

    if (!motor) throw new NotFound(ERROR_MESSAGE);

    return motor;
  }

  public async updateOne(id: string, obj: unknown): Promise<IMotorcycle> {
    if (id.length !== 24) throw new BadRequest(ERROR_LENGTH_MESSAGE);

    const parsed = motorZodSchema.safeParse(obj);

    if (!parsed.success) throw new BadRequest(BAD_REQUEST);

    const updatedMotor = await this._motorModel.update(id, parsed.data);

    if (!updatedMotor) throw new BadRequest(BAD_REQUEST);

    return updatedMotor;
  }
  public async delete(id: string): Promise<void> {
    if (id.length !== 24) throw new BadRequest(ERROR_LENGTH_MESSAGE);
    await this._motorModel.delete(id);
  }
}

export default MotorcycleService;