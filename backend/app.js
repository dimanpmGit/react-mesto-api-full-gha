// app.js — входной файл
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const rateLimit = require('express-rate-limit');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const usersRouter = require('./routes/users');
const {
  login,
  createUser,
} = require('./controllers/users');
const cardsRouter = require('./routes/cards');
const auth = require('./middlewares/auth');
const {
  signupValidation,
  signinValidation,
} = require('./middlewares/validations');
const NotFoundError = require('./errors/not-found-err');
const { cors } = require('./middlewares/cors');

const { PORT = 3000 } = process.env;
const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use(cors);
app.use(bodyParser.json());
app.use(limiter);

app.use(requestLogger); // подключаем логгер запросов

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

// роуты, не требующие авторизации,
// например, регистрация и логин
app.post('/signin', signinValidation, login);
app.post('/signup', signupValidation, createUser);

// авторизация
app.use(auth);
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use('/*', (req, res, next) => next(new NotFoundError('Страница не найдена')));

// подключаемся к серверу mongo
mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {});

app.use(errorLogger); // подключаем логгер ошибок

// обработчики ошибок
app.use(errors()); // обработчик ошибок celebrate

// Мидлвар централизованной обработки ошибок
app.use((err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
});
app.listen(PORT);
