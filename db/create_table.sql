CREATE TABLE hotels (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  address VARCHAR(50) NOT NULL,
  stars FLOAT(2) UNSIGNED
);

INSERT INTO hotels (name, address, stars) VALUES
  ('Hotel California', '1967 Can Never Leave Ln, San Fancisco CA, 94016', 7.6),
  ('The Galt House', '140 N Fourth St, Louisville, KY 40202', 8.0);