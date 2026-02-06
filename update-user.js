const { Client } = require('pg');
const { randomBytes, scryptSync } = require('crypto');

function hashPassword(password) {
  const salt = randomBytes(16).toString('hex');
  const hash = scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
}

async function updateUser() {
  const client = new Client({
    connectionString: 'postgresql://neondb_owner:npg_IslrKXAte1p6@ep-calm-glitter-ahz37phz-pooler.c-3.us-east-1.aws.neon.tech:5432/neondb?sslmode=require'
  });

  try {
    await client.connect();

    const passwordHash = hashPassword('admin123');

    await client.query(
      'UPDATE users SET password_hash = $1 WHERE email = $2',
      [passwordHash, 'admin@example.com']
    );

    console.log('Usuario actualizado con hash scrypt');
    console.log('Nuevo hash:', passwordHash);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.end();
  }
}

updateUser();