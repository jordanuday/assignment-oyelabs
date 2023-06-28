const mysql = require('mysql');

const customers = [
  {
    email: 'virresh11@ymail.com',
    name: 'viru'
  },
  {
    email: 'srgbn@ymail.com',
    name: 'srgbn'
  },
  {
    email: 'ujijk@ymail.com',
    name: 'ujihlk'
  },
  {
    email: 'aidisj@ymail.com',
    name: 'adish'
  },
  {
    email: 'koiai@ymail.com',
    name: 'koiai'
  },
  
];

const pool = mysql.createPool({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'your_database'
});

// Function to insert customers into the database
function insertCustomers(customers) {
  customers.forEach(customer => {
    // Check if the email already exists
    pool.query('SELECT * FROM customers WHERE email = ?', [customer.email], (error, results) => {
      if (error) {
        console.error('Error querying the database:', error);
        return;
      }

      if (results.length > 0) {
        // Email exists then  update the customer's name
        pool.query('UPDATE customers SET name = ? WHERE email = ?', [customer.name, customer.email], error => {
          if (error) {
            console.error('Error updating customer:', error);
          }
        });
      } else {
        // If Email doesn't exist, insert a new customer
        pool.query('INSERT INTO customers (email, name) VALUES (?, ?)', [customer.email, customer.name], error => {
          if (error) {
            console.error('Error inserting customer:', error);
          }
        });
      }
    });
  });
}

insertCustomers(customers);