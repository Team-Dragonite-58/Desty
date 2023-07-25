import { Pool } from 'pg';
import { SqlQuery } from '../../types';

const pool: Pool = new Pool({
  host: 'db',
  user: 'postgres',
  password: 'postgres',
  database: 'db',
  port: 5432,
});

const db: SqlQuery = {
  query: (text, params, callback) => {
    console.log('Connected to DB...', text);
    return pool.query(text, params, callback);
  },
};

export default db;
