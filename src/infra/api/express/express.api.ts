import swaggerUi from 'swagger-ui-express';
import morgan from 'morgan';

import { Api } from '../interfaces/api';
import express from 'express';
import { ExpressRouter } from './router';
import { inject, injectable } from 'inversify';
import { ConfigManager } from '../../../application/lib/config-manager/config-manager.lib';
import swaggerSpec from '../../docs/swagger';

@injectable()
export class ExpressApi extends Api {
  private app: express.Express;
  private appRouter: ExpressRouter;

  constructor(@inject(ConfigManager) private readonly configManager: ConfigManager) {
    super();
    this.app = express();
    this.configureMiddlewares();
    this.appRouter = new ExpressRouter(this.app);
  }

  configureMiddlewares() {
    this.app.use(express.json());
    this.app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    this.app.use(
      morgan((tokens, req, res) => {
        return [
          `[${tokens.method(req, res)}]`,
          tokens.url(req, res),
          tokens.status(req, res),
          '-',
          tokens['response-time'](req, res),
          'ms'
        ].join(' ');
      })
    );
  }

  run(): void {
    const appPort = this.configManager.getOrThrowError('PORT');
    this.appRouter.createRoutes();

    this.app.listen(appPort, () => {
      console.log(`[APP INFO]: API is running at ${appPort}`);
    });
  }
}
