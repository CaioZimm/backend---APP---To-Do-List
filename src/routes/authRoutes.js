const express = require('express')
const routes = express.Router()
const authController = require('../controllers/authController')

routes.post('/register', authController.registerUser);
routes.post('/login', authController.loginUser);

module.exports = routes;