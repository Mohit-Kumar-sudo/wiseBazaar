const express = require('express')
const router = express.Router()
const Controller = require('../Controller/Result.Controller')
const { verifyAccessToken } = require('../helpers/jwt_helper')

router.post('/create', verifyAccessToken, Controller.create)

router.post('/updateById', verifyAccessToken, Controller.updateById)

router.post('/getTodayResult', verifyAccessToken, Controller.getTodayResult)

router.post('/getDeletedList', verifyAccessToken, Controller.getDeletedList)

router.post('/getDataById', verifyAccessToken, Controller.getDataById)

router.post('/deleteDataById', verifyAccessToken, Controller.deleteDataById)

router.post('/restoreDataById', verifyAccessToken, Controller.restoreDataById)


module.exports = router
