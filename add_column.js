const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgresql://neondb_owner:npg_IslrKXAte1p6@ep-calm-glitter-ahz37phz-pooler.c-3.us-east-1.aws.neon.tech:5432/neondb?sslmode=require',
});

async function run() {
  await client.connect();
  await client.query(`ALTER TABLE users ADD COLUMN IF NOT EXISTS roles text[] DEFAULT ARRAY['ASISTENTE'];`);
  await client.query(`UPDATE users SET roles = ARRAY['ASISTENTE'] WHERE roles IS NULL;`);
  await client.query(`ALTER TABLE users ALTER COLUMN roles SET NOT NULL;`);
  console.log('Column added');
  await client.end();
}

run().catch(console.error);