// const express = require('express')
// const router = express.Router()
// const Controller = require('../Controller/Bid.Controller')
// const { verifyAccessToken } = require('../helpers/jwt_helper')

// router.post('/create', verifyAccessToken, Controller.create)

// router.post('/withdrawalrequest', verifyAccessToken, Controller.withdrawalrequest)

// router.post('/withdrawalrequestList', verifyAccessToken, Controller.withdrawalrequestList)

// router.post('/paymentCreate', verifyAccessToken, Controller.paymentCreate)

// router.post('/paymentUpdateById', verifyAccessToken, Controller.paymentUpdateById)

// router.post('/paymentDeleteDataById', verifyAccessToken, Controller.paymentDeleteDataById)

// router.post('/updateById', verifyAccessToken, Controller.updateById)

// router.post('/getList', verifyAccessToken, Controller.getList)

// router.post('/kalyanResultGetList', verifyAccessToken, Controller.kalyanResultGetList)

// router.post('/getkalyanEventList', verifyAccessToken, Controller.getkalyanEventList)

// router.post('/getPaymentList', verifyAccessToken, Controller.getPaymentList)

// router.post('/getEventList', verifyAccessToken, Controller.getEventList)

// router.post('/getresultList', verifyAccessToken, Controller.getresultList)

// router.post('/getKalyanResultList', verifyAccessToken, Controller.getKalyanResultList)

// router.post('/getDeletedList', verifyAccessToken, Controller.getDeletedList)

// router.post('/getDataById', Controller.getDataById)

// router.post('/getEventsListById', verifyAccessToken, Controller.getEventsListById)

// router.post('/deleteDataById', Controller.deleteDataById)

// router.post('/restoreDataById', verifyAccessToken, Controller.restoreDataById)

// module.exports = router


const express = require('express')
const router = express.Router()
const Controller = require('../Controller/Bid.Controller')
const { verifyAccessToken } = require('../helpers/jwt_helper')

router.post('/create', verifyAccessToken, Controller.create)

router.post('/ManualPaymentAdd', verifyAccessToken, Controller.ManualPaymentAdd)

router.post('/withdrawalrequest', verifyAccessToken, Controller.withdrawalrequest)

router.post('/withdrawalrequestList', verifyAccessToken, Controller.withdrawalrequestList)

router.post('/paymentCreate', verifyAccessToken, Controller.paymentCreate)

router.post('/paymentCreateUpi', verifyAccessToken, Controller.paymentCreateUpi)

router.post('/paymentUpdateById', verifyAccessToken, Controller.paymentUpdateById)

router.get('/updatePaymentstatus/:id', Controller.updatePaymentstatus)

router.post('/paymentDeleteDataById', verifyAccessToken, Controller.paymentDeleteDataById)

router.post('/updateById', verifyAccessToken, Controller.updateById)

router.post('/manualPaymentTnxUpdateById', verifyAccessToken, Controller.manualPaymentTnxUpdateById)

router.post('/getList', verifyAccessToken, Controller.getList)

router.post('/ManualPaymentgetList', verifyAccessToken, Controller.ManualPaymentgetList)

router.post('/kalyanResultGetList', verifyAccessToken, Controller.kalyanResultGetList)

router.post('/getkalyanEventList', verifyAccessToken, Controller.getkalyanEventList)

router.post('/getPaymentList', verifyAccessToken, Controller.getPaymentList)

router.post('/getEventList', verifyAccessToken, Controller.getEventList)

router.get('/getresultList/home', Controller.getresultListHome)

router.post('/getresultList', verifyAccessToken, Controller.getresultList)


router.post('/getKalyanResultList', verifyAccessToken, Controller.getKalyanResultList)

router.post('/getDeletedList', verifyAccessToken, Controller.getDeletedList)

router.post('/getDataById', Controller.getDataById)

router.post('/getEventsListById', verifyAccessToken, Controller.getEventsListById)

router.post('/deleteDataById', Controller.deleteDataById)

router.post('/restoreDataById', verifyAccessToken, Controller.restoreDataById)

router.post('/validateBidStatus', verifyAccessToken, Controller.validateBidStatus)

router.post('/getNotificationList', verifyAccessToken, Controller.getNotificationList)

module.exports = router
