CREATE DATABASE IF NOT EXISTS restaurant_pos;
USE restaurant_pos;

CREATE TABLE IF NOT EXISTS menu_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  category ENUM('Starter','Main','Dessert') NOT NULL,
  emoji VARCHAR(10) DEFAULT '🍽️'
);

CREATE TABLE IF NOT EXISTS orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  table_no INT NOT NULL,
  status ENUM('Received','Preparing','Ready','Served') DEFAULT 'Received',
  total DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT,
  menu_item_id INT,
  name VARCHAR(100),
  price DECIMAL(10,2),
  quantity INT DEFAULT 1,
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (menu_item_id) REFERENCES menu_items(id)
);

INSERT INTO menu_items (name, price, category, emoji) VALUES
('Paneer Tikka', 180, 'Starter', '🧀'),
('Veg Spring Rolls', 120, 'Starter', '🥢'),
('Chicken Wings', 220, 'Starter', '🍗'),
('Butter Chicken', 320, 'Main', '🍛'),
('Dal Makhani', 220, 'Main', '🫘'),
('Paneer Butter Masala', 280, 'Main', '🍲'),
('Veg Biryani', 240, 'Main', '🍚'),
('Gulab Jamun', 80, 'Dessert', '🟤'),
('Rasmalai', 100, 'Dessert', '🍮'),
('Ice Cream', 90, 'Dessert', '🍨');
