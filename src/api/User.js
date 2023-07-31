const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
const port = 3000;

// 创建与MySQL数据库的连接
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'product'
});

connection.connect(function(err) {
  if (err) throw err;
  console.log('MySQL数据库已连接');
});

// 解析HTTP请求体中的JSON格式参数
app.use(bodyParser.json());

// 获取所有管理员信息
app.get('/admin', function(req, res) {
  connection.query('SELECT * FROM admin', function(err, result) {
    if (err) throw err;
    res.send(result);
  });
});

// 添加新的管理员信息
app.post('/admin', function(req, res) {
  const { name, gender, age, address } = req.body;
  const sql = `INSERT INTO admin (name, gender, age, address) VALUES ('${name}', '${gender}', ${age}, '${address}')`;
  connection.query(sql, function(err, result) {
    if (err) throw err;
    res.send('已成功添加一名管理员');
  });
});

// 更新指定管理员信息
app.put('/admin/:id', function(req, res) {
  const id = req.params.id;
  const { name, gender, age, address } = req.body;
  const sql = `UPDATE admin SET name='${name}', gender='${gender}', age=${age}, address='${address}' WHERE id=${id}`;
  connection.query(sql, function(err, result) {
    if (err) throw err;
    res.send(`已成功更新ID为${id}的管理员信息`);
  });
});

// 删除指定管理员信息
app.delete('/admin/:id', function(req, res) {
  const id = req.params.id;
  const sql = `DELETE FROM admin WHERE id=${id}`;
  connection.query(sql, function(err, result) {
    if (err) throw err;
    res.send(`已成功删除ID为${id}的管理员信息`);
  });
});

// 获取所有产品信息
app.get('/api/products', function(req, res) {
  connection.query('SELECT * FROM product_info', function(err, result) {
    if (err) throw err;
    res.send(result);
  });
});

// 添加新的产品信息
app.post('/api/products', function(req, res) {
  const { name, price, stock, category } = req.body;
  const sql = `INSERT INTO product_info (name, price, stock, category) VALUES ('${name}', ${price}, ${stock}, '${category}')`;
  connection.query(sql, function(err, result) {
    if (err) throw err;
    res.send('已成功添加一条产品信息');
  });
});

// 更新指定产品信息
app.put('/api/products/:id', function(req, res) {
  const id = req.params.id;
  const { name, price, stock, category } = req.body;
  const sql = `UPDATE product_info SET name='${name}', price=${price}, stock=${stock}, category='${category}' WHERE id=${id}`;
  connection.query(sql, function(err, result) {
    if (err) throw err;
    res.send(`已成功更新ID为${id}的产品信息`);
  });
});

// 删除指定产品信息
app.delete('/api/products/:id', function(req, res) {
  const id = req.params.id;
  const sql = `DELETE FROM product_info WHERE id=${id}`;
  connection.query(sql, function(err, result) {
    if (err) throw err;
    res.send(`已成功删除ID为${id}的产品信息`);
  });
});

// 启动服务
app.listen(port, function() {
  console.log(`后端服务已启动，监听端口号${port}`);
});
