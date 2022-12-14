import { IService } from '../interfaces/IService';
import { ICar, carZodSchema } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import BadRequest from '../errors/customErrors/BadRequest';
import NotFound from '../errors/customErrors/NotFound';

const ERROR_LENGTH_MESSAGE = 'Id must have 24 hexadecimal characters';

class CarService implements IService<ICar> {
  constructor(private carModel: IModel<ICar>) {}

  public async read(): Promise<ICar[] | []> {
    const cars = await this.carModel.read();

    if (!cars) return [];

    return cars as ICar[];
  }

  public async create(obj: ICar): Promise<ICar> {
    const parsed = carZodSchema.safeParse(obj);
    if (!parsed.success) throw new BadRequest('Bad Request');

    const newCar = await this.carModel.create(parsed.data);

    return newCar;
  }

  public async readOne(id: string): Promise<ICar> {
    if (id.length !== 24) throw new BadRequest(ERROR_LENGTH_MESSAGE);
    
    const car = await this.carModel.readOne(id);

    if (!car) throw new NotFound('Object not found');

    return car;
  }

  public async updateOne(id: string, obj: unknown): Promise<ICar> {
    if (id.length !== 24) throw new BadRequest(ERROR_LENGTH_MESSAGE);

    const parsed = carZodSchema.safeParse(obj);
    if (!parsed.success) throw new BadRequest('Bad Request');

    const updatedCar = await this.carModel.update(id, parsed.data);

    if (!updatedCar) throw new NotFound('Object not found');

    return updatedCar;
  }

  public async delete(id: string): Promise<void> {
    if (id.length !== 24) throw new BadRequest(ERROR_LENGTH_MESSAGE);
    await this.carModel.delete(id);
  }
}

export default CarService;