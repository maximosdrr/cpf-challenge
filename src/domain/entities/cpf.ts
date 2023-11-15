import { InvalidCpfException } from '../exceptions/invalid-cpf.exception';
import { CPFProps } from '../interfaces/cpf-props';
import { CPFValidator } from '../rules/cpf-validator';

export class CPF implements CPFProps {
  id?: number;
  cpf: string;
  createdAt?: Date;

  constructor(data: Partial<CPF>) {
    this.id = data.id;
    this.cpf = data.cpf!;
    this.createdAt = data.createdAt;

    this.sanitizeCpf();
  }

  validate() {
    if (!CPFValidator.isValid(this.cpf)) {
      throw new InvalidCpfException();
    }
  }

  sanitizeCpf() {
    this.cpf = this.cpf.replace(/\D/g, '');
  }

  static fromObject(data: Partial<CPF>) {
    return new CPF({
      cpf: data?.cpf,
      createdAt: data?.createdAt,
      id: data?.id
    });
  }

  toJSON(): Record<string, unknown> {
    return {
      id: this.id,
      createdAt: this.createdAt,
      cpf: this.cpf
    };
  }

  removeProp(prop: keyof CPFProps) {
    delete this[prop];
  }
}
