INSERT INTO users (email, google_id)
VALUES ('demo@rentit.com', 'demo-google-id')
ON CONFLICT (email) DO NOTHING;

INSERT INTO listings
(owner_id, title, description, price, transaction_type, property_type,
 location, bedrooms, area_sqft, image_url)
VALUES
(1, '2BHK Apartment in City Center',
 'Spacious 2BHK flat near metro, semi-furnished, ideal for families.',
 25000, 'Rent', 'Flat', 'Bangalore - Indiranagar', 2, 900,
 'https://via.placeholder.com/400x250?text=2BHK+Flat'),
(1, 'Independent House with Garden',
 '3BHK independent house with private garden and parking.',
 12500000, 'Buy', 'House', 'Chennai - Anna Nagar', 3, 1800,
 'https://via.placeholder.com/400x250?text=Independent+House');
