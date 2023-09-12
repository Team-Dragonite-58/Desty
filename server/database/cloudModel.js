import pkg from 'pg';
const { Pool } = pkg;

const URI =
  '';

const pool = new Pool({
  connectionString: URI,
});

const db = {
  query: (text, params, callback) => {
    console.log('Connected to DB...', text);
    return pool.query(text, params, callback);
  },
};



export default db;
