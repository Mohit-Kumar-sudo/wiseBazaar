const express = require('express')
const router = express.Router()
const Controller = require('../Controller/KalyanStarline.Controller')
const { verifyAccessToken } = require('../helpers/jwt_helper')

router.post('/create', verifyAccessToken, Controller.create)

router.post('/updateById', verifyAccessToken, Controller.updateById)

router.post('/getList', verifyAccessToken, Controller.getList)

router.post('/getDeletedList', verifyAccessToken, Controller.getDeletedList)

router.post('/getDataById', Controller.getDataById)

router.post('/deleteDataById', Controller.deleteDataById)

router.post('/restoreDataById', verifyAccessToken, Controller.restoreDataById)

module.exports = router
