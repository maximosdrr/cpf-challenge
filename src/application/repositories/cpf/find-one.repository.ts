import { CPF } from '../../../domain/entities/cpf';

export abstract class FindOneCPFRepository {
  abstract execute(cpf: CPF): Promise<CPF | null>;
}
