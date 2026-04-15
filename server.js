console.log("SERVER FILE RUNNING ✅");
const express = require('express');
const mysql = require('mysql2');
const app = express();
app.use('/images', express.static('images'));

// Middleware
app.use(express.json());

// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'anika2720',
  database: 'restaurant_pos'
});

// Connect to MySQL
db.connect(err => {
  if (err) {
    console.log("DB error:", err);
  } else {
    console.log("MySQL Connected...");
  }
});

// =====================
// API ROUTES (IMPORTANT: FIRST)
// =====================

// Get menu
app.get('/api/menu', (req, res) => {
  db.query("SELECT * FROM menu_items", (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("DB error");
    }
    res.json(result);
  });
});

// Get all orders
app.get('/api/orders', (req, res) => {
  db.query("SELECT * FROM orders", (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("DB error");
    }
    res.json(result);
  });
});

// Place order
app.post('/api/orders', (req, res) => {
  const { table_no, items } = req.body;

  if (!table_no || !items || items.length === 0) {
    return res.json({ success: false, message: "Invalid order" });
  }

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  db.query(
    "INSERT INTO orders (table_no, items, total, status) VALUES (?, ?, ?, 'Received')",
    [table_no, JSON.stringify(items), total],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.json({ success: false });
      }

      res.json({
        success: true,
        orderId: result.insertId,
        total
      });
    }
  );
});

// Update order status
app.patch('/api/orders/:id/status', (req, res) => {
  const { status } = req.body;
  const id = req.params.id;

  db.query(
    "UPDATE orders SET status=? WHERE id=?",
    [status, id],
    (err) => {
      if (err) {
        console.log(err);
        return res.json({ success: false });
      }
      res.json({ success: true });
    }
  );
});

// =====================
// STATIC FILES (IMPORTANT: LAST)
// =====================
app.use(express.static('public'));

// =====================
// START SERVER
// =====================
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});