import { inject, injectable } from 'inversify';

import { ErrorBase } from '../../../../domain/exceptions/error-base';
import { NotFoundCpfException } from '../../../../domain/exceptions/not-found.exception';
import { StatusCode } from '../../../../domain/rules/status';
import { UseCaseInput, UseCaseResponse } from '../../../interfaces/input-output';
import { UseCase } from '../../../interfaces/use-case';
import { FindOneCPFRepository } from '../../../repositories/cpf/find-one.repository';
import { CacheResponse } from '../../../utils/decorators/cache-response';
import { CPF } from '../../../../domain/entities/cpf';
import { CheckCPFInput, CheckCPFResponse } from './types';
@injectable()
export class CheckCpfUseCase extends UseCase<CheckCPFResponse> {
  constructor(@inject(FindOneCPFRepository) private readonly findOneCpfRepository: FindOneCPFRepository) {
    super();
  }

  @CacheResponse(60)
  async execute(data: UseCaseInput<CheckCPFInput>): Promise<UseCaseResponse<CheckCPFResponse>> {
    try {
      const targetCPF = new CPF({ cpf: data.content.cpf });

      targetCPF.validate();

      const foundCPF = await this.findOneCpfRepository.execute(targetCPF);

      if (!foundCPF) throw new NotFoundCpfException();

      return {
        statusCode: StatusCode.SUCCESS,
        data: foundCPF.toJSON()
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
