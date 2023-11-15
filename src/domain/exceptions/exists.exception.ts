import { StatusCode } from '../rules/status';
import { DomainMessages } from '../utils/messages';
import { ErrorBase } from './error-base';

export class ExistsCpfException extends ErrorBase {
  constructor(
    msg: string = DomainMessages.ExistsCPFError,
    type = 'ExistsCpfException',
    statusCode = StatusCode.BAD_REQUEST
  ) {
    super(msg, type, statusCode);
  }
}
