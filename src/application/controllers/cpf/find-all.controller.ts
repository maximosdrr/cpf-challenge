import { inject, injectable } from 'inversify';
import { Controller, ControllerResponse } from '../../interfaces/controller';
import { FindAllCpfUseCase } from '../../use-cases/cpf/find-all';
import { FindAllCPFInput, FindAllCPFResponse } from '../../use-cases/cpf/find-all/types';
import { FindAllCPFValidator } from './validators/find-all.validator';
import { CatchControllerError } from '../../utils/decorators/catch-error';

@injectable()
export class FindAllCPFController extends Controller<FindAllCPFInput, FindAllCPFResponse> {
  constructor(@inject(FindAllCpfUseCase) private readonly useCase: FindAllCpfUseCase) {
    super();
  }

  @CatchControllerError
  execute(params: FindAllCPFInput): Promise<ControllerResponse<FindAllCPFResponse>> {
    FindAllCPFValidator.validate(params);

    return this.useCase.execute({
      content: params
    });
  }
}

/**
 * @swagger
 * /cpf:
 *   get:
 *     summary: Get CPF list
 *     description: Retrieve a list of CPFs with pagination.
 *     parameters:
 *       - in: query
 *         name: page
 *         description: Page number for pagination (default is 1)
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         description: Number of items per page (default is 10)
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: The date of creation
 *                   cpf:
 *                     type: string
 *                     description: The CPF value
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
 *                 message: Invalid parameters. Please check your request.
 */
