import { z } from 'zod';
import { IVehicle } from './IVehicle';

export interface ICar extends IVehicle {
  doorsQty: number,
  seatsQty: number,
}

const carZodSchema = z.object({
  doorsQty: z.number().min(2).max(4),
  seatsQty: z.number().min(2).max(7),
  model: z.string().min(3),
  year: z.number().min(1900).max(2022),
  color: z.string().min(3),
  buyValue: z.number(), 
});

export { carZodSchema };