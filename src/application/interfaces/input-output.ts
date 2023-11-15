import { StatusCode } from '../../domain/rules/status';

export interface UseCaseInput<T = unknown> {
  content: T;
}

export interface UseCaseResponse<T = unknown> {
  data: T | null;
  statusCode: StatusCode;
}
