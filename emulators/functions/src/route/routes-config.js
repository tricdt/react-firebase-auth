const express = require('express')
const router = express.Router()
const userController = require('./../controllers/userController')
const auth = require('../middleware/auth')

const initWebRoutes = (app) => {
   app.post('/users', auth.isAuthenticated(), auth.isAuthorized({
      hasRole: ['admin', 'manager']
   }), userController.create)
   app.get('/users', auth.isAuthenticated(), auth.isAuthorized({
      hasRole: ['admin', 'manager']
   }), userController.all)
}

module.exports = initWebRoutes