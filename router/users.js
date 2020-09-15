const express = require('express');
const router = express.Router()

const userController = require('../controller/users')

router.post('/api/exercise/new-user' , userController.createUser)

router.get('/api/exercise/users' , userController.getUsers)

router.post('/api/exercise/add' , userController.addExercise)
module.exports = router