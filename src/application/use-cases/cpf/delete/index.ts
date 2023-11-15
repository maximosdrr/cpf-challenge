import { inject, injectable } from 'inversify';
import { DeleteCPFInput, DeleteCPFResponse } from './types';
import { UseCase } from '../../../interfaces/use-case';
import { DeleteCPFRepository } from '../../../repositories/cpf/delete.repository';
import { FindOneCPFRepository } from '../../../repositories/cpf/find-one.repository';
import { UseCaseInput, UseCaseResponse } from '../../../interfaces/input-output';
import { CPF } from '../../../../domain/entities/cpf';
import { NotFoundCpfException } from '../../../../domain/exceptions/not-found.exception';
import { StatusCode } from '../../../../domain/rules/status';
import { ErrorBase } from '../../../../domain/exceptions/error-base';

@injectable()
export class DeleteCpfUseCase extends UseCase<DeleteCPFResponse> {
  constructor(
    @inject(FindOneCPFRepository) private readonly findOneRepository: FindOneCPFRepository,
    @inject(DeleteCPFRepository) private readonly deleteRepository: DeleteCPFRepository
  ) {
    super();
  }

  async execute(data: UseCaseInput<DeleteCPFInput>): Promise<UseCaseResponse<DeleteCPFResponse>> {
    try {
      const cpf = new CPF({ cpf: data.content.cpf });

      cpf.validate();

      const foundCPF = await this.findOneRepository.execute(cpf);

      if (!foundCPF) throw new NotFoundCpfException();

      await this.deleteRepository.execute(foundCPF);

      return {
        data: null,
        statusCode: StatusCode.SUCCESS
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
