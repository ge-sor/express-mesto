const User = require('../models/user');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new Error('Произошла ошибка');
      }
      res.send(user);
    })
    .catch((err) => next(err));
};

module.exports.addUser = (req, res, next) => {
  User.create(req.user)
    .then((user) => {
      if (!user) {
        throw new Error('Произошла ошибка');
      }
      res.send(user);
    })
    .catch((err) => next(err));
};
