const validator = require('validator');

const isUrlCheck = (value) => {
  const result = validator.isURL(value);
  if (result) {
    return value;
  } else {
    throw new Error('Ошибка валидации URL');
  }
};

module.exports = isUrlCheck;
