import pkg from 'pg';
const { Pool } = pkg;
// const { Pool } = require('pg');

const URI =
  'postgres://fdmzhonk:1UJxOe9TaNJBM9GMoEpkR-cAiWIQ2IeO@mahmud.db.elephantsql.com/fdmzhonk';

const pool = new Pool({
  // host: 'mahmud.db.elephantsql.com',
  // user: 'fdmzhonk',
  // password: '1UJxOe9TaNJBM9GMoEpkR-cAiWIQ2IeO',
  // database: 'fdmzhonk',
  // port: 5432,
  connectionString: URI,
});

const db = {
  query: (text, params, callback) => {
    console.log('Connected to DB...', text);
    return pool.query(text, params, callback);
  },
};



export default db;
