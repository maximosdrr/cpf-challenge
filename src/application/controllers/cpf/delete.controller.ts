import { inject, injectable } from 'inversify';
import { Controller, ControllerResponse } from '../../interfaces/controller';
import { DeleteCPFInput, DeleteCPFResponse } from '../../use-cases/cpf/delete/types';
import { DeleteCpfUseCase } from '../../use-cases/cpf/delete';
import { DeleteCPFValidator } from './validators/delete-cpf.validator';
import { CatchControllerError } from '../../utils/decorators/catch-error';

@injectable()
export class DeleteCPFController extends Controller<DeleteCPFInput, DeleteCPFResponse> {
  constructor(@inject(DeleteCpfUseCase) private readonly useCase: DeleteCpfUseCase) {
    super();
  }

  @CatchControllerError
  execute(params: DeleteCPFInput): Promise<ControllerResponse<DeleteCPFResponse>> {
    DeleteCPFValidator.validate(params);
    return this.useCase.execute({
      content: params
    });
  }
}

/**
 * @swagger
 * /cpf/{cpf}:
 *   delete:
 *     summary: Delete CPF by CPF
 *     description: Delete a specific CPF by its identifier.
 *     parameters:
 *       - in: path
 *         name: cpf
 *         description: The CPF to delete.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: CPF deleted successfully
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
