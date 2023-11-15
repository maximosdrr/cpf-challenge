import { MikroORM } from '@mikro-orm/core';
import type { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { injectable } from 'inversify';

@injectable()
export class MikroOrmSetup {
  constructor() {}

  async init() {
    const orm = await MikroORM.init<PostgreSqlDriver>();

    const migrator = orm.getMigrator();

    try {
      await migrator.up();
      console.log('Migrations have run successfully.');
    } catch (err) {
      console.error('Error running migrations:', err);
    }

    return orm;
  }
}
