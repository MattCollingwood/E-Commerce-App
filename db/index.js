import pg from 'pg'
const { Pool, Client } = pg

const pool = new Pool({
  user: process.env.USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: null,
  port: 5432
});

console.log(await pool.query('SELECT NOW()'));

const client = new Client({
    user: process.env.USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: null,
    port: 5432
});
await client.connect();
console.log(await client.query('SELECT NOW()'));
await client.end();