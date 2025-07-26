// lib/db.ts
import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default pool;
// export async function query(text: string, params?: any[]) {
//   const start = Date.now();
//   const res = await pool.query(text, params);
//   const duration = Date.now() - start;
//   console.log('executed query', { text, duration, rows: res.rowCount });
//   return res;
// }
