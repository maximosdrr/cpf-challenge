import express from 'express';
import { ExpressRouterAdapter } from './adapters/route.adapter';
import { DIContainer } from '../../di/di';

import { CheckCPFController } from '../../../application/controllers/cpf/check.controller';
import { FindAllCPFController } from '../../../application/controllers/cpf/find-all.controller';
import { InsertCPFController } from '../../../application/controllers/cpf/insert.controller';
import { DeleteCPFController } from '../../../application/controllers/cpf/delete.controller';

export class ExpressRouter {
  appRouter: express.Router;

  constructor(router: express.Router) {
    this.appRouter = router;
  }

  createRoutes() {
    const di = DIContainer.getInstance();

    const checkCPF = di.diContainer.get(CheckCPFController);
    const findAllCPF = di.diContainer.get(FindAllCPFController);
    const insertCPF = di.diContainer.get(InsertCPFController);
    const deleteCPF = di.diContainer.get(DeleteCPFController);

    this.appRouter.get('/cpf', (req, res) => ExpressRouterAdapter.Adapt(req, res, findAllCPF));
    this.appRouter.get('/cpf/:cpf', (req, res) => ExpressRouterAdapter.Adapt(req, res, checkCPF));
    this.appRouter.post('/cpf', (req, res) => ExpressRouterAdapter.Adapt(req, res, insertCPF));
    this.appRouter.delete('/cpf/:cpf', (req, res) => ExpressRouterAdapter.Adapt(req, res, deleteCPF));
  }
}
