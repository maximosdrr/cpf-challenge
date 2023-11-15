import { z, ZodError } from 'zod';
import { InsertCPFInput } from '../../../use-cases/cpf/insert/types';

export class InsertCPFValidator {
  static validate(value: InsertCPFInput): void {
    const schema = z.object({
      cpf: z.string()
    });

    try {
      schema.parse({
        cpf: value.cpf
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
