import { IService } from '../interfaces/IService';
import { ICar, carZodSchema } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import BadRequest from '../errors/customErrors/BadRequest';
import NotFound from '../errors/customErrors/NotFound';

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

  public async updateOne(id: string, obj: unknown): Promise<ICar> {
    if (id.length !== 24) throw new BadRequest('Id must have 24 hexadecimal characters');

    const parsed = carZodSchema.safeParse(obj);
    if (!parsed.success) throw new BadRequest('Bad Request');

    const updatedCar = await this.carModel.update(id, parsed.data);

    if (!updatedCar) throw new NotFound('Object not found');

    return updatedCar;
  }
}

export default CarService;