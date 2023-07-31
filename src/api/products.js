const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'product',
});

const app = express();

app.use(express.json());
app.use(cors());

app.get('/api/products', (req, res) => {
  pool.getConnection((error, connection) => {
    if (error) {
      console.error('Error getting MySQL connection:', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      console.log('Connected to MySQL database');

      connection.query('SELECT * FROM product_info', (error, results) => {
        connection.release();
        if (error) {
          console.error('Error executing MySQL query:', error);
          res.status(500).json({ error: 'Internal server error' });
        } else {
          console.log('Received data from MySQL database:', results);

          res.json(results);
        }
      });
    }
  });
});

app.post('/api/products', (req, res) => {
  const { name, price, stock, category } = req.body;

  pool.getConnection((error, connection) => {
    if (error) {
      console.error('Error getting MySQL connection:', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      console.log('Connected to MySQL database');

      
      connection.query('INSERT INTO product_info (name, price, stock, category) VALUES (?, ?, ?, ?)', [name, price, stock, category], (error, results) => {
        connection.release();
        if (error) {
          console.error('Error executing MySQL query:', error);
          res.status(500).json({ error: 'Internal server error' });
        } else {
          console.log('Inserted data into MySQL database:', results);

          res.json(results);
        }
      });
    }
  });
});

app.put('/api/products/:id', (req, res) => {
  const id = req.params.id;
  const { name, price, stock, category } = req.body;

  pool.getConnection((error, connection) => {
    if (error) {
      console.error('Error getting MySQL connection:', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      console.log('Connected to MySQL database');

   
      connection.query('UPDATE product_info SET name = ?, price = ?, stock = ?, category = ? WHERE id = ?', [name, price, stock, category, id], (error, results) => {
        connection.release();
        if (error) {
          console.error('Error executing MySQL query:', error);
          res.status(500).json({ error: 'Internal server error' });
        } else {
          console.log('Updated data in MySQL database:', results);

          res.json(results);
        }
      });
    }
  });
});

app.delete('/api/products/:id', (req, res) => {
  const id = req.params.id;

  pool.getConnection((error, connection) => {
    if (error) {
      console.error('Error getting MySQL connection:', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      console.log('Connected to MySQL database');

      connection.query('DELETE FROM product_info WHERE id = ?', [id], (error, results) => {
        connection.release();
        if (error) {
          console.error('Error executing MySQL query:', error);
          res.status(500).json({ error: 'Internal server error' });
        } else {
          if (results.affectedRows === 0) {
            
            res.status(404).json({ error: 'Product not found' });
          } else {
            console.log('Deleted data from MySQL database:', results);
            res.json(results);
          }
        }
      });
    }
  });
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});