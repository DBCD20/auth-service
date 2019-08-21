const express   = require('express');
const auth      = express.Router();
const { updateUser, deleteUser } = require('./auth_handler');


auth.route('/')
    .put(updateUser)
    .delete(deleteUser);

module.exports = auth;