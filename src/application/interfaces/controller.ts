import { injectable } from 'inversify';
import { StatusCode } from '../../domain/rules/status';

export interface ControllerResponse<T = unknown> {
  data: T | null;
  statusCode: StatusCode;
}

@injectable()
export abstract class Controller<T, K> {
  abstract execute(params: T): Promise<ControllerResponse<K>>;
}
