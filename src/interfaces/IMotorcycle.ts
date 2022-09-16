import { z } from 'zod';
import { IVehicle } from './IVehicle';

type MotorCategory = 'Street' | 'Custom' | 'Trail';

export interface IMotorcycle extends IVehicle {
  category: MotorCategory;
  engineCapacity: number;
}

export const motorZodSchema = z.object({
  buyValue: z.number(),
  category: z.enum(['Street', 'Custom', 'Trail']),
  color: z.string(),
  engineCapacity: z.number().min(1).max(2500),
  model: z.string(),
  status: z.boolean().optional(),
  year: z.number().min(1900).max(2022),
});