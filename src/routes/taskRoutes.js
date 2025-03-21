const express = require('express')
const routes = express.Router()
const authMiddleware = require('../middlewares/authMiddleware')
const taskController = require('../controllers/taskController')

routes.post('/task', authMiddleware, taskController.createTask);

routes.get('/task', authMiddleware, taskController.getAllTasks);
routes.get('/task/:id', authMiddleware, taskController.showTask);

routes.put('/task/:id', authMiddleware, taskController.putTask);

routes.delete('/task/:id', authMiddleware, taskController.deleteTask);

module.exports = routes;