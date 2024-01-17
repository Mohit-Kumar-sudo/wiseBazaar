const express = require('express')
const router = express.Router()
const authController = require('../Controller/Auth.Controller')
const { verifyAccessToken } = require('../helpers/jwt_helper')

router.post('/register', authController.register)

router.post('/getDataById', verifyAccessToken, authController.getDataById)

router.post('/updateDataById', verifyAccessToken, authController.updateDataById)

router.post('/login', authController.login)

router.post('/loginByPin', authController.loginByPin)

router.post('/spinAvail', authController.spinAvail)

router.post('/refresh-token', authController.refreshToken)

router.delete('/logout', authController.logout)

router.post('/validatePassword', verifyAccessToken, authController.validatePassword)

router.post('/generatePin', verifyAccessToken, authController.generatePin)

router.post('/validatePin', verifyAccessToken, authController.validatePin)

router.post('/resetMpin', verifyAccessToken, authController.resetMpin)


module.exports = router