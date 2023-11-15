import { CPFProps } from '../../../../domain/interfaces/cpf-props';

export type InsertCPFResponse = InsertCPFResponseError | null;

export interface InsertCPFResponseError extends CPFProps {
  type?: string;
  message?: string;
  cpf?: string;
}

export interface InsertCPFInput {
  cpf: string;
}
