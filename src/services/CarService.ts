import { IService } from '../interfaces/IService';
import { ICar, carZodSchema } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import BadRequest from '../errors/customErrors/BadRequest';

class CarService implements IService<ICar> {
  constructor(private carModel: IModel<ICar>) {}

  public async create(obj: ICar): Promise<ICar> {
    const parsed = carZodSchema.safeParse(obj);
    if (!parsed.success) throw new BadRequest('Bad Request');

    const newCar = await this.carModel.create(parsed.data);

    return newCar;
  }
}

export default CarService;