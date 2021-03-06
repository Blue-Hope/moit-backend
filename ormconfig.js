const node_env = process.env.NODE_ENV;
let databaseConfig =
  node_env == 'production'
    ? require(__dirname + '/src/config/database/database.config.production.js')
    : require(__dirname + '/src/config/database/database.config.local.js');

let testConfig =
  node_env === 'test'
    ? require(__dirname + '/src/config/test/test.config.ts')
    : undefined;

const defaultEntity = [];

const productionTypeOrmConfig =
  process.env.TYPEORM == 'true'
    ? {
        migrations: ['src/migration/*.ts'],
        cli: {
          migrationsDir: 'src/migration',
        },
        entities: ['src/app/**/*.entity.ts', ...defaultEntity],
      }
    : { entities: ['dist/app/**/*.entity.js', ...defaultEntity] };

if (node_env === 'local' || node_env === undefined) {
  databaseConfig = {
    ...databaseConfig,
    migrations: ['src/migration/*.ts'],
    cli: {
      migrationsDir: 'src/migration',
    },
    entities: ['src/app/**/*.entity.ts', ...defaultEntity],
  };
} else if (node_env === 'production') {
  databaseConfig = {
    ...databaseConfig,
    ...productionTypeOrmConfig,
  };
} else if (node_env === 'test') {
  databaseConfig = {
    ...testConfig.createTestConfiguration(),
    migrations: ['src/migration/test/*.ts'],
    cli: {
      migrationsDir: 'src/migration/test',
    },
    entities: ['src/app/**/*.entity.ts'],
  };
}

module.exports = databaseConfig;
