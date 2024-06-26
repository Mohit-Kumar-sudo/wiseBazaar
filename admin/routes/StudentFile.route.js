const express = require('express')
const router = express.Router()
const Controller = require('../Controller/StudentFile.Controller')
const { verifyAccessToken } = require('../helpers/jwt_helper')

router.post('/create', verifyAccessToken, Controller.create)

router.post('/updateById', verifyAccessToken, Controller.updateById)

router.post('/getList', verifyAccessToken, Controller.getList)

router.post('/getDeletedList', verifyAccessToken, Controller.getDeletedList)

router.post('/getDataById', verifyAccessToken, Controller.getDataById)

router.post('/getScheduleById', verifyAccessToken, Controller.getScheduleById)

router.post('/deleteDataById', verifyAccessToken, Controller.deleteDataById)

router.post('/restoreDataById', verifyAccessToken, Controller.restoreDataById)

router.post('/processDataById', verifyAccessToken, Controller.processDataById)

module.exports = router
