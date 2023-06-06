// Методы работы с карточками
const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-err');
const NotCardOwnerError = require('../errors/not-card-owner-err');

const getAllCards = (req, res, next) => {
  Card.find({})
    .then((card) => res.send(card))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.status(201).send(card))
    .catch(next);
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params.id)
    .then((card) => {
      if (!card) {
        next(new NotFoundError('Карточка не найдена'));
      }
      if (card.owner.toString() !== req.user._id) {
        next(new NotCardOwnerError('Удалить карточку может только владелец'));
      }
      return Card.findByIdAndRemove(req.params.id);
    })
    .then(() => res.send({ message: 'Карточка удалена' }))
    .catch(next);
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      }
      return res.send(card);
    })
    .catch(next);
};

const unlikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      }
      return res.send(card);
    })
    .catch(next);
};

module.exports = {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  unlikeCard,
};
