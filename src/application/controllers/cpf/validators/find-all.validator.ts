import { z, ZodError } from 'zod';
import { FindAllCPFInput } from '../../../use-cases/cpf/find-all/types';

export class FindAllCPFValidator {
  static validate(value: FindAllCPFInput): void {
    const schema = z.object({
      page: z.number().min(1),
      limit: z.number().min(1)
    });

    try {
      schema.parse({
        page: Number(value.page),
        limit: Number(value.limit)
      });
    } catch (error) {
      if (error instanceof ZodError) {
        throw new Error(error.errors[0].message);
      } else {
        throw error;
      }
    }
  }
}
