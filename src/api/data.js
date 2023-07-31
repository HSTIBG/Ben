const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
const port = 3000;


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


app.use(bodyParser.json());


app.get('/admin', function(req, res) {
  connection.query('SELECT * FROM admin', function(err, result) {
    if (err) throw err;
    res.send(result);
  });
});


app.post('/admin', function(req, res) {
  const { name, gender, age, address } = req.body;
  const sql = `INSERT INTO admin (name, gender, age, address) VALUES ('${name}', '${gender}', ${age}, '${address}')`;
  connection.query(sql, function(err, result) {
    if (err) throw err;
    res.send('已成功添加一名管理员');
  });
});


app.put('/admin/:id', function(req, res) {
  const id = req.params.id;
  const { name, gender, age, address } = req.body;
  const sql = `UPDATE admin SET name='${name}', gender='${gender}', age=${age}, address='${address}' WHERE id=${id}`;
  connection.query(sql, function(err, result) {
    if (err) throw err;
    res.send(`已成功更新ID为${id}的管理员信息`);
  });
});


app.delete('/admin/:id', function(req, res) {
  const id = req.params.id;
  const sql = `DELETE FROM admin WHERE id=${id}`;
  connection.query(sql, function(err, result) {
    if (err) throw err;
    res.send(`已成功删除ID为${id}的管理员信息`);
  });
});


app.listen(port, function() {
  console.log(`后端服务已启动，监听端口号${port}`);
});