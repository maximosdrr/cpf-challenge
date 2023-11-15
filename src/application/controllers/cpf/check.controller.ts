import { inject, injectable } from 'inversify';
import { Controller, ControllerResponse } from '../../interfaces/controller';
import { CheckCpfUseCase } from '../../use-cases/cpf/check';
import { CheckCPFInput, CheckCPFResponse } from '../../use-cases/cpf/check/types';
import { CheckCPFValidator } from './validators/check-cpf.validator';
import { CatchControllerError } from '../../utils/decorators/catch-error';

@injectable()
export class CheckCPFController extends Controller<CheckCPFInput, CheckCPFResponse> {
  constructor(@inject(CheckCpfUseCase) private readonly useCase: CheckCpfUseCase) {
    super();
  }

  @CatchControllerError
  execute(params: CheckCPFInput): Promise<ControllerResponse<CheckCPFResponse>> {
    CheckCPFValidator.validate(params);

    return this.useCase.execute({
      content: params
    });
  }
}

/**
 * @swagger
 * /cpf/{cpf}:
 *   get:
 *     summary: Get CPF by CPF
 *     description: Retrieve a specific CPF by its identifier.
 *     parameters:
 *       - in: path
 *         name: cpf
 *         description: The CPF to retrieve.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: The date of creation
 *                 cpf:
 *                   type: string
 *                   description: The CPF value
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 type:
 *                   type: string
 *                   description: Error type
 *                 message:
 *                   type: string
 *                   description: Error message
 *               example:
 *                 type: ValidationError
 *                 message: Invalid parameters. Please check your request.
 */
