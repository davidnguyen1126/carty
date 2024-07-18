-- Start a transaction
BEGIN;

-- Create a temporary table to store the JSON data
CREATE TEMP TABLE tmp_data (data jsonb);

-- Load the JSON file into the temp table
COPY tmp_data FROM '/products/products.json';

-- Insert data into the actual products table
INSERT INTO products (id, title, description, dosage, category_id, effects, qty, price, store_id, image)
SELECT 
    (data->>'id')::int, 
    data->>'title', 
    data->>'description', 
    data->>'dosage', 
    (data->>'category_id')::int, 
    data->>'effects', 
    (data->>'qty')::int, 
    (data->>'price')::float8, 
    (data->>'store_id')::int, 
    data->>'image'
FROM tmp_data, jsonb_array_elements(tmp_data.data) as data;

-- Commit the transaction
COMMIT;
