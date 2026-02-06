const { Client } = require('pg');
const { randomBytes, scryptSync } = require('crypto');

function hashPassword(password) {
  const salt = randomBytes(16).toString('hex');
  const hash = scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
}

async function createTestUsers() {
  const client = new Client({
    connectionString: 'postgresql://neondb_owner:npg_IslrKXAte1p6@ep-calm-glitter-ahz37phz-pooler.c-3.us-east-1.aws.neon.tech:5432/neondb?sslmode=require'
  });

  try {
    await client.connect();

    const users = [
      {
        email: 'organizer@example.com',
        fullName: 'Event Organizer',
        password: 'organizer123',
        roles: ['ORGANIZER']
      },
      {
        email: 'assistant@example.com',
        fullName: 'Assistant User',
        password: 'assistant123',
        roles: ['ASSISTANT']
      },
      {
        email: 'scanner@example.com',
        fullName: 'QR Scanner',
        password: 'scanner123',
        roles: ['SCANNER']
      },
      {
        email: 'student@example.com',
        fullName: 'Student User',
        password: 'student123',
        roles: ['STUDENT']
      }
    ];

    for (const user of users) {
      const passwordHash = hashPassword(user.password);

      await client.query(
        'INSERT INTO users (email, full_name, password_hash, roles) VALUES ($1, $2, $3, $4) ON CONFLICT (email) DO NOTHING',
        [user.email, user.fullName, passwordHash, user.roles]
      );

      console.log(`Usuario creado: ${user.email} (${user.roles.join(', ')})`);
    }

    console.log('\nUsuarios de prueba creados exitosamente!');
    console.log('\nCredenciales de prueba:');
    console.log('Admin: admin@example.com / admin123');
    console.log('Organizer: organizer@example.com / organizer123');
    console.log('Assistant: assistant@example.com / assistant123');
    console.log('Scanner: scanner@example.com / scanner123');
    console.log('Student: student@example.com / student123');

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.end();
  }
}

createTestUsers();