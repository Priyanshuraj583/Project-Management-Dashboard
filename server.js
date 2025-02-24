const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 52443;

app.use(cors());
app.use(bodyParser.json());

const users = [
  { username: 'dev', password: 'password', token: 'dev-token' },
  { username: 'manager', password: 'password', token: 'manager-token' }
];

app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    res.json({ token: user.token });
  } else {
    res.status(401).send('Invalid credentials');
  }
});

app.post('/api/auth/signup', (req, res) => {
  const { username, password } = req.body;
  if (users.find(u => u.username === username)) {
    res.status(400).send('User already exists');
  } else {
    users.push({ username, password, token: `${username}-token` });
    res.json({ success: true });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});