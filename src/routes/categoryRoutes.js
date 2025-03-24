const express = require('express')
const routes = express.Router()
const authMiddleware = require('../middlewares/authMiddleware')
const categoryController = require('../controllers/categoryController')

routes.post('/category', authMiddleware, categoryController.createCategory);

routes.get('/category', authMiddleware, categoryController.getAllCategories);
routes.get('/category/:id', authMiddleware, categoryController.showCategory);

routes.put('/category/:id', authMiddleware, categoryController.putCategory);

routes.delete('/category/:id', authMiddleware, categoryController.deleteCategory);

module.exports = routes;