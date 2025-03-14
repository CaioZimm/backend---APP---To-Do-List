const express = require('express')
const routes = express.Router()
const authMiddleware = require('../middlewares/authMiddleware');
const authController = require('../controllers/authController');

routes.post('/register', authController.registerUser);
routes.post('/login', authController.loginUser);
routes.post('/logout', authMiddleware, authController.logoutUser);

module.exports = routes;