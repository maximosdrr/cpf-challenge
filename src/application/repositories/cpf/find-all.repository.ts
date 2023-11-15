import { CPF } from '../../../domain/entities/cpf';
import { Pagination } from '../../interfaces/pagination';

export interface FindAllCPFParams extends Pagination {}

export abstract class FindAllCPFRepository {
  abstract execute(data: FindAllCPFParams): Promise<CPF[] | null>;
}
