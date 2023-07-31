const express = require('express');
const router = express.Router();

const User = require('../models/user');

router.post('/register', (req, res) => {
  const { username, password, repeat } = req.body;
  if (password !== repeat) {
    return res.json({ code: -1, msg: '两次输入的密码不一致！' });
  }
  User.findOne({ username }, (err, user) => {
    if (err) throw err;
    if (user) {
      return res.json({ code: -2, msg: '该用户名已被注册！' });
    }
    const newUser = new User({
      username,
      password,
    });
    newUser.save((err, user) => {
      if (err) throw err;
      console.log('用户已保存：', user);
      return res.json({ code: 0, msg: '注册成功！' });
    })
  });
});

// models/user.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  createTime: { type: Date, default: Date.now() },
})

module.exports = mongoose.model('User', userSchema);