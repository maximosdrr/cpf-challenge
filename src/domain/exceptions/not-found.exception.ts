import { StatusCode } from '../rules/status';
import { DomainMessages } from '../utils/messages';
import { ErrorBase } from './error-base';

export class NotFoundCpfException extends ErrorBase {
  constructor(
    msg: string = DomainMessages.NotFoundCPFError,
    type = 'NotFoundCpfException',
    statusCode = StatusCode.NOT_FOUND
  ) {
    super(msg, type, statusCode);
  }
}
