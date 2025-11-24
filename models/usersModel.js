import pool from "../db.js";

export async function findByGoogleId(googleId) {
  const { rows } = await pool.query(
    "SELECT * FROM users WHERE google_id = $1",
    [googleId]
  );
  return rows[0];
}

export async function findByEmail(email) {
  const { rows } = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );
  return rows[0];
}

export async function createUser({ email, google_id }) {
  const { rows } = await pool.query(
    `INSERT INTO users (email, google_id)
     VALUES ($1, $2)
     RETURNING *`,
    [email, google_id]
  );
  return rows[0];
}

export async function findById(id) {
  const { rows } = await pool.query(
    "SELECT * FROM users WHERE id = $1",
    [id]
  );
  return rows[0];
}
