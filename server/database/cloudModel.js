import { Pool } from 'pg';

const pool = new Pool({
  host: 'db',
  user: 'postgres',
  password: 'postgres',
  database: 'db',
  port: 5432,
});

const db = {
  query: (text, params, callback) => {
    console.log('Connected to DB...', text);
    return pool.query(text, params, callback);
  },
};

export default db;
