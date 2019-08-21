const express   = require('express');
const auth      = express.Router();
const { signup, signin } = require('./auth_handler');


auth.post('/signup', signup);
auth.post('/signin', signin);

module.exports = auth;