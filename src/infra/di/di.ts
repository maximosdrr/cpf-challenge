import { Container } from 'inversify';
import { FindOneCPFRepository } from '../../application/repositories/cpf/find-one.repository';
import { FindOneCPFRepositoryMikroOrmImpl } from '../database/mikro-orm/repositories/cpf/find-one.repository';
import { MikroOrmSetup } from '../database/mikro-orm/mikro-orm';
import { CPFEntity } from '../database/mikro-orm/orm-entities/cpf.entity';
import { SqlEntityRepository } from '@mikro-orm/postgresql';
import { CacheManagerRedisImpl } from '../lib/cache/redis.lib';
import { CacheManager } from '../../application/lib/cache/cache.lib';

import { FindAllCPFRepositoryMikroOrmImpl } from '../database/mikro-orm/repositories/cpf/find-all.repository';
import { FindAllCPFRepository } from '../../application/repositories/cpf/find-all.repository';
import { DeleteCPFRepository } from '../../application/repositories/cpf/delete.repository';
import { DeleteCPFRepositoryMikroOrmImpl } from '../database/mikro-orm/repositories/cpf/delete.repository';
import { InsertCPFRepository } from '../../application/repositories/cpf/insert.repository';
import { InsertCPFRepositoryMikroOrmImpl } from '../database/mikro-orm/repositories/cpf/insert.repository';
import { Api } from '../api/interfaces/api';
import { ExpressApi } from '../api/express/express.api';
import { ConfigManager } from '../../application/lib/config-manager/config-manager.lib';
import { ConfigManagerImpl } from '../lib/config-manager.ts/config-manager.lib';
import { InsertCPFController } from '../../application/controllers/cpf/insert.controller';
import { CheckCPFController } from '../../application/controllers/cpf/check.controller';
import { DeleteCPFController } from '../../application/controllers/cpf/delete.controller';
import { FindAllCPFController } from '../../application/controllers/cpf/find-all.controller';
import { InsertCpfUseCase } from '../../application/use-cases/cpf/insert';
import { DeleteCpfUseCase } from '../../application/use-cases/cpf/delete';
import { FindAllCpfUseCase } from '../../application/use-cases/cpf/find-all';
import { CheckCpfUseCase } from '../../application/use-cases/cpf/check';

export class DIContainer {
  private static instance: DIContainer | null = null;

  public diContainer: Container;

  private constructor() {
    this.diContainer = new Container();
  }

  static getInstance(): DIContainer {
    if (!DIContainer.instance) {
      DIContainer.instance = new DIContainer();
    }
    return DIContainer.instance;
  }

  async configure() {
    this.configureEnvManager();
    this.configureApi();
    this.configureCache();
    await this.configureORM();

    this.configureRepositories();
    this.configureUseCases();
    this.configureControllers();
  }

  configureRepositories() {
    this.diContainer
      .bind<FindOneCPFRepository>(FindOneCPFRepository)
      .to(FindOneCPFRepositoryMikroOrmImpl)
      .inSingletonScope();

    this.diContainer
      .bind<FindAllCPFRepository>(FindAllCPFRepository)
      .to(FindAllCPFRepositoryMikroOrmImpl)
      .inSingletonScope();

    this.diContainer
      .bind<DeleteCPFRepository>(DeleteCPFRepository)
      .to(DeleteCPFRepositoryMikroOrmImpl)
      .inSingletonScope();

    this.diContainer
      .bind<InsertCPFRepository>(InsertCPFRepository)
      .to(InsertCPFRepositoryMikroOrmImpl)
      .inSingletonScope();
  }

  configureUseCases() {
    this.diContainer.bind<CheckCpfUseCase>(CheckCpfUseCase).toSelf().inSingletonScope();
    this.diContainer.bind<InsertCpfUseCase>(InsertCpfUseCase).toSelf().inSingletonScope();
    this.diContainer.bind<DeleteCpfUseCase>(DeleteCpfUseCase).toSelf().inSingletonScope();
    this.diContainer.bind<FindAllCpfUseCase>(FindAllCpfUseCase).toSelf().inSingletonScope();
  }

  configureControllers() {
    this.diContainer.bind<InsertCPFController>(InsertCPFController).toSelf().inSingletonScope();
    this.diContainer.bind<CheckCPFController>(CheckCPFController).toSelf().inSingletonScope();
    this.diContainer.bind<DeleteCPFController>(DeleteCPFController).toSelf().inSingletonScope();
    this.diContainer.bind<FindAllCPFController>(FindAllCPFController).toSelf().inSingletonScope();
  }

  async configureORM() {
    const mikroOrm = await new MikroOrmSetup().init();

    const CPFRepository = mikroOrm.em.fork().getRepository(CPFEntity);
    this.diContainer
      .bind<SqlEntityRepository<CPFEntity>>(SqlEntityRepository<CPFEntity>)
      .toConstantValue(CPFRepository);
  }

  configureCache() {
    this.diContainer.bind<CacheManager>(CacheManager).to(CacheManagerRedisImpl).inSingletonScope();
  }

  configureApi() {
    this.diContainer.bind<Api>('express_api').to(ExpressApi).inSingletonScope();
  }

  configureEnvManager() {
    this.diContainer.bind<ConfigManager>(ConfigManager).to(ConfigManagerImpl).inSingletonScope();
  }
}
