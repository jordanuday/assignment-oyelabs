const express = require('express');
const mysql = require('mysql');
const app = express();

app.use(express.json());

const pool = mysql.createPool({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'your_database'
});

app.post('/api/customers', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ success: false, message: 'Name and email are required' });
  }

  pool.query('SELECT * FROM customers WHERE email = ?', [email], (error, results) => {
    if (error) {
      console.error('Error checking for duplicates:', error);
      return res.status(500).json({ success: false, message: 'An error occurred' });
    }

    if (results.length > 0) {
      return res.status(400).json({ success: false, message: 'Customer with the same email already exists' });
    }

    const query = 'INSERT INTO customers (name, email) VALUES (?, ?)';
    pool.query(query, [name, email], (error, results) => {
      if (error) {
        console.error('Error adding customer:', error);
        return res.status(500).json({ success: false, message: 'An error occurred' });
      }

      res.json({ success: true, message: 'Customer added successfully' });
    });
  });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});