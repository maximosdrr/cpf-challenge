import { Request, Response } from 'express';
import { ApiRequest } from '../../interfaces/types';
import { Controller } from '../../../../application/interfaces/controller';

export class ExpressRouterAdapter {
  static async Adapt(req: Request, res: Response, controller: Controller<unknown, unknown>) {
    const input: ApiRequest = {
      body: req?.body ?? null,
      params: req?.params ?? null,
      query: req?.query ?? null
    };

    const result = await controller.execute({
      ...input?.body,
      ...input?.params,
      ...input?.query
    });

    return res.status(result.statusCode).send(result.data);
  }
}
