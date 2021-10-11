const express = require('express');
const mongoose = require('mongoose');

const PORT = 3000;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use('/', require('./routes/users'));

app.use('/cards', require('./routes/cards'));

app.use((req, res, next) => {
  req.user = {
    _id: '616328e5080f458d4d4bd9ca',
  };
  next();
});

app.listen(PORT, () => {
  console.log(`App on port ${PORT}`);
});
