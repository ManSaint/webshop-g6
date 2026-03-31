/*
 * Migration: 002_products
 *
 * Creates the categories, products, and reviews tables.
 * These tables are publicly readable (no RLS) — product data is not sensitive.
 *
 * Seed data is loaded separately via supabase/seed.ts from server/products.json.
 */

-- 1. Categories
CREATE TABLE categories (
  id    integer PRIMARY KEY,
  name  text    NOT NULL,
  slug  text    NOT NULL UNIQUE,
  image text
);

-- 2. Products
CREATE TABLE products (
  id                     integer      PRIMARY KEY,
  title                  text         NOT NULL,
  description            text,
  price                  numeric(10,2) NOT NULL,
  discount_percentage    numeric(5,2),
  rating                 numeric(3,2),
  stock                  integer      DEFAULT 0,
  brand                  text,
  sku                    text,
  weight                 numeric(8,2),
  dimensions             jsonb,
  warranty_information   text,
  shipping_information   text,
  availability_status    text,
  return_policy          text,
  minimum_order_quantity integer,
  thumbnail              text,
  images                 text[],
  tags                   text[],
  category_id            integer      REFERENCES categories(id),
  created_at             timestamptz  NOT NULL DEFAULT now(),
  updated_at             timestamptz  NOT NULL DEFAULT now()
);

CREATE INDEX idx_products_category_id ON products(category_id);

-- 3. Reviews
CREATE TABLE reviews (
  id             serial       PRIMARY KEY,
  product_id     integer      NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  rating         integer      NOT NULL,
  comment        text,
  reviewer_name  text,
  reviewer_email text,
  date           timestamptz,
  created_at     timestamptz  NOT NULL DEFAULT now()
);

CREATE INDEX idx_reviews_product_id ON reviews(product_id);
