import { StatusCode } from '../rules/status';
import { DomainMessages } from '../utils/messages';

export abstract class ErrorBase extends Error {
  type: string;
  message: string;
  statusCode: StatusCode;
  isErrorBase = true;

  constructor(msg: string, type: string, statusCode: StatusCode) {
    super(msg);
    this.type = type;
    this.message = msg;
    this.statusCode = statusCode;
  }

  static ParseError(error: Error | ErrorBase): ErrorBase {
    if ((error as ErrorBase)?.isErrorBase) {
      const baseCpfError = error as ErrorBase;

      return {
        message: baseCpfError.message,
        type: baseCpfError.type,
        name: baseCpfError.name,
        stack: baseCpfError.stack,
        statusCode: baseCpfError.statusCode,
        isErrorBase: true
      };
    }

    return {
      message: error?.message ?? DomainMessages.unknownError,
      type: DomainMessages.unknownError,
      name: error?.name ?? DomainMessages.unknownError,
      stack: error?.stack,
      statusCode: StatusCode.INTERNAL_ERROR,
      isErrorBase: false
    };
  }
}
