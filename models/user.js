const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'userName',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'userAbout',
  },
  avatar: {
    type: String,
    default: 'userAvatar',
  },
});

module.exports = mongoose.model('user', userSchema);
