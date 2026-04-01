-- Wishlist table: stores which products a user has wishlisted
CREATE TABLE wishlist (
  id         serial       PRIMARY KEY,
  user_id    text         NOT NULL,
  product_id integer      NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  created_at timestamptz  NOT NULL DEFAULT now(),
  UNIQUE (user_id, product_id)
);

CREATE INDEX idx_wishlist_user_id ON wishlist(user_id);

-- Cart table: stores cart items with quantity and price snapshot
CREATE TABLE cart (
  id           serial        PRIMARY KEY,
  user_id      text          NOT NULL,
  product_id   integer       NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  quantity     integer       NOT NULL DEFAULT 1 CHECK (quantity > 0),
  price_at_add numeric(10,2) NOT NULL,
  created_at   timestamptz   NOT NULL DEFAULT now(),
  updated_at   timestamptz   NOT NULL DEFAULT now(),
  UNIQUE (user_id, product_id)
);

CREATE INDEX idx_cart_user_id ON cart(user_id);
