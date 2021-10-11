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
        throw new Error('Ошибка при нахождении пользователя');
      }
      res.send(user);
    })
    .catch((err) => next(err));
};

module.exports.addUser = (req, res, next) => {
  User.create(req.user)
    .then((user) => {
      if (!user) {
        throw new Error('Ошибка при добавлении пользователя');
      }
      res.send(user);
    })
    .catch((err) => next(err));
};

module.exports.updateUser = (req, res, next) => {
  const userId = req.user._id;
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    userId,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        throw new Error('Ошибка при обновлении профиля');
      }
      res.send({ data: user });
    })
    .catch((err) => next(err));
};

module.exports.updateAvatar = (req, res, next) => {
  const userId = req.user._id;
  const { avatar } = req.body;
  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .then((data) => {
      if (!data) {
        throw new Error('Ошибка при обновлении аватара');
      }
      res.send({ data });
    })
    .catch((err) => next(err));
};
