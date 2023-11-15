import { inject, injectable } from 'inversify';
import { InsertCPFInput, InsertCPFResponse } from './types';
import { UseCase } from '../../../interfaces/use-case';
import { InsertCPFRepository } from '../../../repositories/cpf/insert.repository';
import { FindOneCPFRepository } from '../../../repositories/cpf/find-one.repository';
import { UseCaseInput, UseCaseResponse } from '../../../interfaces/input-output';
import { ExistsCpfException } from '../../../../domain/exceptions/exists.exception';
import { CPF } from '../../../../domain/entities/cpf';
import { StatusCode } from '../../../../domain/rules/status';
import { ErrorBase } from '../../../../domain/exceptions/error-base';

@injectable()
export class InsertCpfUseCase extends UseCase<InsertCPFResponse> {
  constructor(
    @inject(InsertCPFRepository) private readonly insertRepository: InsertCPFRepository,
    @inject(FindOneCPFRepository) private readonly findOneRepository: FindOneCPFRepository
  ) {
    super();
  }

  async execute(data: UseCaseInput<InsertCPFInput>): Promise<UseCaseResponse<InsertCPFResponse>> {
    try {
      const targetCPF = new CPF({ cpf: data.content.cpf });
      const cpf = await this.findOneRepository.execute(targetCPF);

      if (cpf) throw new ExistsCpfException();

      const cpfEntity = new CPF({ cpf: data.content.cpf });

      cpfEntity.validate();

      await this.insertRepository.execute(cpfEntity);

      return {
        statusCode: StatusCode.SUCCESS,
        data: null
      };
    } catch (e) {
      const error = ErrorBase.ParseError(e as ErrorBase);

      return {
        statusCode: error?.statusCode ?? StatusCode.BAD_REQUEST,
        data: {
          type: error.type,
          message: error?.message
        }
      };
    }
  }
}
