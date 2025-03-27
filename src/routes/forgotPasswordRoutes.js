const express = require('express')
const routes = express.Router()
const forgotPasswordController = require('../controllers/forgotPasswordController')

routes.post('/forgot-password', forgotPasswordController.forgotPasswordUser);
routes.post('/reset-password', forgotPasswordController.resetPasswordUser);

module.exports = routes;