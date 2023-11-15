import { z, ZodError } from 'zod';
import { CheckCPFInput } from '../../../use-cases/cpf/check/types';

export class CheckCPFValidator {
  static validate(value: CheckCPFInput): void {
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
