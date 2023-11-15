import { inject, injectable } from 'inversify';

import { FindAllCPFInput, FindAllCPFResponse } from './types';
import { UseCase } from '../../../interfaces/use-case';
import { FindAllCPFRepository } from '../../../repositories/cpf/find-all.repository';
import { UseCaseInput, UseCaseResponse } from '../../../interfaces/input-output';
import { StatusCode } from '../../../../domain/rules/status';
import { ErrorBase } from '../../../../domain/exceptions/error-base';
import { CacheResponse } from '../../../utils/decorators/cache-response';

@injectable()
export class FindAllCpfUseCase extends UseCase<FindAllCPFResponse> {
  constructor(@inject(FindAllCPFRepository) private readonly findAllCpfRepository: FindAllCPFRepository) {
    super();
  }

  @CacheResponse(60)
  async execute(data: UseCaseInput<FindAllCPFInput>): Promise<UseCaseResponse<FindAllCPFResponse>> {
    try {
      const result = await this.findAllCpfRepository.execute(data.content);

      return {
        statusCode: StatusCode.SUCCESS,
        data: result
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
