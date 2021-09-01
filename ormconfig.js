
module.exports = {
  type: process.env.DB_DIALECT,
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  logging: process.env.NODE_ENV !== 'production',
  entities: [
    process.env.NODE_ENV === 'production'
      ? 'build/infra/database/typeorm/entities/*.js'
      : 'src/infra/database/typeorm/entities/*.ts'
  ],
  migrations: [
    process.env.NODE_ENV === 'production'
      ? 'build/infra/database/typeorm/migrations/*.js'
      : 'src/infra/database/typeorm/migrations/*.ts'
  ],
  cli: {
    entitiesDir: 'src/infra/database/typeorm/entities',
    migrationsDir: 'src/infra/database/typeorm/migrations'
  }
}
