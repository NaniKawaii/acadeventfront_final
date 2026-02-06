import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';

async function migrate() {
  const config = new ConfigService();
  const databaseUrl = config.get<string>('DATABASE_URL');
  const sslMode = config.get<string>('DB_SSLMODE');

  const dataSource = new DataSource({
    type: 'postgres',
    url: databaseUrl,
    ssl: sslMode === 'require' ? { rejectUnauthorized: false } : false,
  });

  await dataSource.initialize();

  // Add roles column
  await dataSource.query(`ALTER TABLE users ADD COLUMN IF NOT EXISTS roles text[] NULL;`);

  // Update existing users to have roles based on role
  await dataSource.query(`
    UPDATE users SET roles = ARRAY[role] WHERE role IS NOT NULL AND roles IS NULL;
  `);

  // Drop role column
  await dataSource.query(`ALTER TABLE users DROP COLUMN IF EXISTS role;`);

  // Make roles not null
  await dataSource.query(`ALTER TABLE users ALTER COLUMN roles SET NOT NULL;`);

  // Set default
  await dataSource.query(`ALTER TABLE users ALTER COLUMN roles SET DEFAULT ARRAY['ASISTENTE'];`);

  await dataSource.destroy();
}

migrate().then(() => console.log('Migration done')).catch(console.error);