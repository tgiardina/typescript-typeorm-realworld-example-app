import express = require('express');

const app: express.Application = express();

app.get('/', function (req, res) {
  res.send('Hello fren');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

const db = require('./models');
