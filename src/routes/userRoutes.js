const express = require('express')
const routes = express.Router()
const authMiddleware = require('../middlewares/authMiddleware')
const userController = require('../controllers/userController')

routes.get('/users', userController.getAllUsers);
routes.get('/user/profile', authMiddleware, userController.getMyProfile);
routes.get('/user/:id', authMiddleware, userController.getUser);

routes.put('/user', authMiddleware, userController.putUser);
routes.put('/user/new_password', authMiddleware, userController.putPassword);

routes.delete('/user', authMiddleware, userController.deleteUser);

module.exports = routes;