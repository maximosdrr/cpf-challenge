import { CPF } from '../../../domain/entities/cpf';

export abstract class DeleteCPFRepository {
  abstract execute(cpf: CPF): Promise<void>;
}
