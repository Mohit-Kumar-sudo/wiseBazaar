const express = require('express')
const router = express.Router()
const userController = require('../Controller/User.Controller')
const { verifyAccessToken } = require('../helpers/jwt_helper')

router.post('/register', verifyAccessToken, userController.register)

router.post('/login', userController.login)

router.post('/refresh-token', userController.refreshToken)

router.delete('/logout', userController.logout)

router.post('/getList', verifyAccessToken, userController.getList)

router.post('/deleteDataById', verifyAccessToken, userController.deleteDataById)

router.post('/addFundById', verifyAccessToken, userController.addFundById)

module.exports = router