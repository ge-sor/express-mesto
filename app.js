const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const PORT = 3000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use((req, res, next) => {
  req.user = {
    _id: '616328e5080f458d4d4bd9ca',
  };
  next();
});

app.use('/users', require('./routes/users'));

app.use('/cards', require('./routes/cards'));

app.listen(PORT, () => {
  console.log(`App on port ${PORT}`);
});
