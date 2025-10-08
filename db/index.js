const { Pool } = require('pg');
const session = require('express-session');
const PgSession = require('connect-pg-simple')(session);

// Create your pg Pool
const pool = new Pool({
  user: process.env.USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: null,
  port: 5432
});

// Export a sessionHandler function
function sessionHandler(session) {
  return new PgSession({
    pool: pool,
    tableName: 'session', // optional: defaults to 'session'
    createTableIfMissing: true // creates the session table if it doesn't exist
  });
}

// Export the pool if needed elsewhere
module.exports = {
  sessionHandler,
  pool
};
