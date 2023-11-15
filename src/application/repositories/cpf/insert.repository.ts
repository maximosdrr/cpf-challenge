import { CPF } from '../../../domain/entities/cpf';

export abstract class InsertCPFRepository {
  abstract execute(cpf: CPF): Promise<void>;
}
