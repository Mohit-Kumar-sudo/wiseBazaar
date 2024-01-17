const express = require('express')
const router = express.Router()
const masterController = require('../Controller/Master.Controller')

router.post('/register', masterController.register)

router.post('/login', masterController.login)

router.post('/refresh-token', masterController.refreshToken)

router.delete('/logout', masterController.logout)

module.exports = router