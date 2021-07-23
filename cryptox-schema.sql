
CREATE TABLE users (
  username VARCHAR(25) NOT NULL PRIMARY KEY ,
  password TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL
    CHECK (position('@' IN email) > 1),
  is_admin BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE portfolio (
  id SERIAL PRIMARY KEY,
  username VARCHAR(25) NOT NULL
    REFERENCES users ON DELETE CASCADE,
  cryptocurrency VARCHAR(25) NOT NULL,
  quantity DECIMAL NOT NULL
);