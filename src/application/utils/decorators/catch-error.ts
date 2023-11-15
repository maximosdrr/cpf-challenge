import { StatusCode } from '../../../domain/rules/status';

export function CatchControllerError(
  target: unknown,
  propertyKey: string,
  descriptor: PropertyDescriptor
): PropertyDescriptor {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: unknown[]) {
    try {
      const result = originalMethod.apply(this, args);
      return result;
    } catch (error) {
      const error_message: string = error instanceof Error ? error.message : 'An error occurred';
      const error_data = {
        data: {
          message: error_message,
          type: 'error'
        },
        statusCode: StatusCode.BAD_REQUEST
      };
      return error_data;
    }
  };

  return descriptor;
}
