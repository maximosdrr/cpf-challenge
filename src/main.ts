import { App } from './app';
import { DIContainer } from './infra/di/di';
import { config } from 'dotenv';
import 'reflect-metadata';

async function bootstrap() {
  config();
  const DI = DIContainer.getInstance();
  await DI.configure();
  const app = new App();

  app.run();
}

bootstrap();
