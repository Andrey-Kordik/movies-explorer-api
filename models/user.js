const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const UnauthorizedError = require('../errors/UnauthorizedError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'Минимальная длина поля "name" - 2'],
    maxlength: [30, 'Максимальная длина поля "name" - 30']
  },
  email: {
    type: String,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Некорректный e-mail',
    },
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
}, { versionKey: false });

userSchema.statics.findUserByCredentials = function signIn(email, password) {
  return this.findOne({ email }, { runValidators: true })
    .select('+password')
    .then((user) => {
      if (!user) throw new UnauthorizedError('Неправильные почта или пароль');
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) throw new UnauthorizedError('Неправильные почта или пароль');

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
