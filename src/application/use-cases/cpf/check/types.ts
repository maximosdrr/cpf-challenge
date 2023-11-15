import { CPF } from '../../../../domain/entities/cpf';

export interface CheckCPFResponse {
  cpf?: CPF;
  type?: string;
  message?: string;
}

export interface CheckCPFInput {
  cpf: string;
}
