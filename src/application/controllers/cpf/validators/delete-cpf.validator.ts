import { z, ZodError } from 'zod';
import { DeleteCPFInput } from '../../../use-cases/cpf/delete/types';

export class DeleteCPFValidator {
  static validate(value: DeleteCPFInput): void {
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
