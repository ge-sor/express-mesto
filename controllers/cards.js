const Card = require('../models/card');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      if (!card) {
        throw new Error('Ошибка создания карточки');
      }
      res.send({ data: card });
    })
    .catch((err) => next(err));
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params)
    .then((card) => {
      if (req.user._id.toString() === card.owner._id.toString()) {
        Card.deleteOne(card).then(() => {
          res.send({ data: card });
        });
      } else {
        throw new Error('Ошибка при удалении карточки');
      }
    })
    .catch((err) => next(err));
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new Error('Ошибка при добавлении лайка');
      }
      res.send({ data: card });
    })
    .catch((err) => next(err));
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new Error('Ошибка при удалении лайка');
      }
      res.send({ data: card });
    })
    .catch((err) => next(err));
};
