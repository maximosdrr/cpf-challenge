import { injectable } from 'inversify';
import { UseCaseInput, UseCaseResponse } from './input-output';

@injectable()
export abstract class UseCase<T> {
  abstract execute(data: UseCaseInput): Promise<UseCaseResponse<T>>;
}
