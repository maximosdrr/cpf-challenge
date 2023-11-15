import { CPFProps } from '../../../../domain/interfaces/cpf-props';

export interface DeleteCPFResponse extends CPFProps {
  type?: string;
  message?: string;
}

export interface DeleteCPFInput {
  cpf: string;
}
