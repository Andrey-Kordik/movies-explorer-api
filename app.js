const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const errorHandler = require('./middlewares/error-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes/index');
const limiter = require('./middlewares/rateLimiter');

const app = express();

const { PORT = 4000 } = process.env;

let database;

if (process.env.NODE_ENV === 'production') {
  database = process.env.DATABASE_URL;
} else {
  database = 'mongodb://127.0.0.1:27017/moviesdb';
}

app.disable('x-powered-by');

app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());

mongoose.connect(database).then(() => {
  console.log('connected to MongoDB');
});

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use(requestLogger);
app.use(limiter);

app.use(router);

app.use(errorLogger);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
