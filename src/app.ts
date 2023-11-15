import 'reflect-metadata';

import { Api } from './infra/api/interfaces/api';
import { DIContainer } from './infra/di/di';

export class App {
  run() {
    const di = DIContainer.getInstance();
    const expressApi: Api = di.diContainer.get('express_api');
    expressApi.run();
  }
}
