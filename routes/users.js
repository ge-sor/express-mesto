const router = require('express').Router();
const {
  getUsers,
  getUser,
  addUser,
} = require('../controllers/users');

router.get('/users', getUsers);

router.get('/users/:userId', getUser);

router.post('/users', addUser);

module.exports = router;
