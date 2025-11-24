import pool from "../db.js";

export async function getAll() {
  const { rows } = await pool.query(
    `SELECT * FROM listings
     WHERE is_active = true
     ORDER BY posted_at DESC`
  );
  return rows;
}

export async function getById(id) {
  const { rows } = await pool.query(
    "SELECT * FROM listings WHERE id = $1",
    [id]
  );
  return rows[0];
}

export async function create(data) {
  const {
    owner_id,
    title,
    description,
    price,
    transaction_type,
    property_type,
    location,
    bedrooms,
    area_sqft,
    image_url,
  } = data;

  const { rows } = await pool.query(
    `INSERT INTO listings
    (owner_id, title, description, price, transaction_type, property_type,
     location, bedrooms, area_sqft, image_url)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
     RETURNING *`,
    [
      owner_id,
      title,
      description,
      price,
      transaction_type,
      property_type,
      location,
      bedrooms || null,
      area_sqft,
      image_url || null,
    ]
  );
  return rows[0];
}

export async function update(id, ownerId, updates) {
  // Simple version: ensure owner owns listing
  const listing = await getById(id);
  if (!listing) throw new Error("Listing not found");
  if (listing.owner_id !== ownerId) throw new Error("Not authorized");

  const merged = { ...listing, ...updates };

  const { rows } = await pool.query(
    `UPDATE listings
     SET title=$1, description=$2, price=$3,
         transaction_type=$4, property_type=$5,
         location=$6, bedrooms=$7, area_sqft=$8, image_url=$9
     WHERE id=$10
     RETURNING *`,
    [
      merged.title,
      merged.description,
      merged.price,
      merged.transaction_type,
      merged.property_type,
      merged.location,
      merged.bedrooms,
      merged.area_sqft,
      merged.image_url,
      id,
    ]
  );

  return rows[0];
}

export async function remove(id, ownerId) {
  const listing = await getById(id);
  if (!listing) throw new Error("Listing not found");
  if (listing.owner_id !== ownerId) throw new Error("Not authorized");

  await pool.query("DELETE FROM listings WHERE id = $1", [id]);
}
