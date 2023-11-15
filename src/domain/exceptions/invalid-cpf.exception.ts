import { StatusCode } from '../rules/status';
import { DomainMessages } from '../utils/messages';
import { ErrorBase } from './error-base';

export class InvalidCpfException extends ErrorBase {
  constructor(
    msg: string = DomainMessages.InvalidCPFError,
    type = 'InvalidCpfException',
    statusCode = StatusCode.BAD_REQUEST
  ) {
    super(msg, type, statusCode);
  }
}
