import { inject, injectable } from 'inversify';
import { Controller, ControllerResponse } from '../../interfaces/controller';
import { InsertCPFInput, InsertCPFResponse } from '../../use-cases/cpf/insert/types';
import { InsertCpfUseCase } from '../../use-cases/cpf/insert';
import { InsertCPFValidator } from './validators/insert-cpf.validator';
import { CatchControllerError } from '../../utils/decorators/catch-error';

@injectable()
export class InsertCPFController extends Controller<InsertCPFInput, InsertCPFResponse> {
  constructor(@inject(InsertCpfUseCase) private readonly useCase: InsertCpfUseCase) {
    super();
  }

  @CatchControllerError
  execute(params: InsertCPFInput): Promise<ControllerResponse<InsertCPFResponse>> {
    InsertCPFValidator.validate(params);
    return this.useCase.execute({
      content: params
    });
  }
}

/**
 * @swagger
 * /cpf:
 *   post:
 *     summary: Create a new CPF
 *     description: Insert a new CPF into the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cpf:
 *                 type: string
 *                 description: The CPF value to be inserted.
 *     responses:
 *       200:
 *         description: CPF created successfully
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
 *                 type: Error Type
 *                 message: Error Message
 *     examples:
 *       SuccessfulResponse:
 *         value:
 *           createdAt: '2023-01-01T12:00:00Z'
 *           cpf: '12345678901'
 *       BadRequest:
 *         value:
 *           type: ValidationError
 *           message: Invalid parameters. Please check your request.
 */
