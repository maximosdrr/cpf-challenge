import { CPF } from '../../../../domain/entities/cpf';

export interface FindAllCPFResponseError {
  type?: string;
  message?: string;
}

export type FindAllCPFResponseSuccess = CPF[];

export type FindAllCPFResponse = FindAllCPFResponseSuccess | FindAllCPFResponseError;

export interface FindAllCPFInput {
  page: number;
  limit: number;
}
