export default {
  entities: ['./build/infra/database/mikro-orm/orm-entities'],
  entitiesTs: ['./build/infra/database/mikro-orm/orm-entities'],
  type: 'postgresql',
  user: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  dbName: process.env.POSTGRES_DB_NAME,
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT
};
