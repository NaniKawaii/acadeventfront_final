const { Client } = require('pg');
const { randomBytes, scryptSync } = require('crypto');

function hashPassword(password) {
  const salt = randomBytes(16).toString('hex');
  const hash = scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
}

async function createTestUser() {
  const client = new Client({
    connectionString: 'postgresql://neondb_owner:npg_IslrKXAte1p6@ep-calm-glitter-ahz37phz-pooler.c-3.us-east-1.aws.neon.tech:5432/neondb?sslmode=require'
  });

  try {
    await client.connect();

    // Hash usando el mismo algoritmo que el backend (scrypt)
    const passwordHash = hashPassword('admin123');

    await client.query(`
      INSERT INTO users (full_name, email, password_hash, roles)
      VALUES ('Admin User', 'admin@example.com', $1, ARRAY['ADMIN'])
      ON CONFLICT (email) DO NOTHING
    `, [passwordHash]);

    console.log('Usuario de prueba creado exitosamente');
    console.log('Email: admin@example.com');
    console.log('Password: admin123');
    console.log('Hash generado:', passwordHash);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.end();
  }
}

createTestUser();