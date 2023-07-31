const express = require('express');
const app = express();
const cors = require('cors');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
const users = [
{
id: 1,
username: 'admin',
password: 'admin'
},
{
id: 2,
username: 'test',
password: 'test'
}
];
app.post('/api/login', (req, res) => {
const { username, password } = req.body;
const user = users.find(user => user.username === username && user.password === password);
if (user) {
res.status(200).json({
code: 0,
msg: '登录成功',
data: {
userId: user.id,
username: user.username
}
});
} else {
res.status(401).json({
code: -1,
msg: '用户名或密码不正确'
});
}
});
app.listen(4000, () => {
console.log('Server is running on port 4000');
});