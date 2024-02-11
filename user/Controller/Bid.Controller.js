// const createError = require('http-errors')
// const Model = require('../models/Bid.Model')
// const EventModel = require('../models/Event.Model')
// const PaymentModel = require('../models/Payment.Model')
// const WithdrawalModel = require('../models/Withdrawal.Model')
// const KalyanEventModel = require('../models/KalyanEvent.Model')
// const KalyanResultModel = require('../models/KalyanResult.Model')
// const User = require('../models/User.model')
// const { purchaseSchema } = require('../helpers/validation_schema')
// const razorpayInstance = require('../helpers/razorpay')
// const mongoose = require('mongoose')

// module.exports = {

//     create: async (req, res, next) => {
//         try {
//             const data = req.body
//             data.created_at = Date.now()
//             data.updated_at = Date.now()
//             data.created_by = req.user.username
//             data.updated_by = req.user.username
//             let amountUpdate = {}
//             if (data.bidAmount) {
//                 amountUpdate = await User.updateOne({ _id: mongoose.Types.ObjectId(data.userId) }, { $inc: { wallet: "-" + data.bidAmount } })
//             }
//             const model = new Model(data)
//             const savedModel = await model.save()
//             if (savedModel) {
//                 res.send({ success: true, msg: 'Data inserted successfully.' })
//             } else {
//                 res.send({ success: false, msg: 'Failed to insert data.' })
//             }

//         } catch (error) {
//             if (error.isJoi === true) error.status = 422
//             next(error)
//         }
//     },

//     withdrawalrequest: async (req, res, next) => {
//         try {
//             const data = req.body
//             data.created_at = Date.now()
//             data.updated_at = Date.now()
//             data.created_by = req.user.username
//             data.updated_by = req.user.username
//             let amountUpdate = {}
//             if (data.withdrawalAmount) {
//                 amountUpdate = await User.updateOne({ _id: mongoose.Types.ObjectId(data.userId) }, { $inc: { wallet: "-" + data.withdrawalAmount } })
//             }
//             const model = new WithdrawalModel(data)
//             const savedModel = await model.save()
//             if (savedModel) {
//                 res.send({ success: true, msg: 'Data inserted successfully.' })
//             } else {
//                 res.send({ success: false, msg: 'Failed to insert data.' })
//             }

//         } catch (error) {
//             if (error.isJoi === true) error.status = 422
//             next(error)
//         }
//     },

//     withdrawalrequestList: async (req, res, next) => {
//         try {
//             const page = req.body.page ? parseInt(req.body.page) : 1
//             const limit = req.body.limit ? parseInt(req.body.limit) : 10
//             const skip = (page * limit) - limit
//             let query = req.body.query ? { ...req.body.query } : {}
//             query = {
//                 is_active: true,
//                 ...query
//             }
//             let list = []
//             const listCount = await WithdrawalModel.countDocuments(query)
//             list = await WithdrawalModel.aggregate([
//                 {
//                     $match: query
//                 },
//                 {
//                     $sort: { _id: -1 }
//                 },
//                 {
//                     $skip: skip
//                 },
//                 {
//                     $limit: limit
//                 },
//             ])
//             if (list) {
//                 res.send({ success: true, msg: 'Data Fetched', data: list, count: listCount })
//             } else {
//                 res.send({ success: false, msg: 'Failed to Fetch Data' })
//             }
//         } catch (error) {
//             if (error.isJoi === true)
//                 return next(createError.BadRequest('Bad Request'))
//             next(error)
//         }
//     },

//     paymentCreate: async (req, res, next) => {
//         try {
//             let data = req.body
//             const result = await purchaseSchema.validateAsync(data)
//             data.created_at = Date.now()
//             data.updated_at = Date.now()
//             data.created_by = req.user.username
//             data.updated_by = req.user.username
//             // data.created_date = data.slot.bidDate
//             if (result) {
//                 saveUserPurchase(result, res)
//             }
//             function saveUserPurchase(data, res) {
//                 var options = {
//                     amount: data.amount * 100, // amount in the smallest currency unit
//                     currency: "INR",
//                     receipt: data.user_email,
//                     payment_capture: '0'
//                 };
//                 razorpayInstance.instance.orders.create(options, function (razor_error, order) {
//                     if (razor_error) {
//                         res.status(417).json({
//                             message: razor_error.message,
//                             payload: null,
//                             error: "razor pay order creation unsuccessful"
//                         });
//                     } else {
//                         data["order"] = order;
//                         const model = new PaymentModel(data)
//                         model.save(async (error, dbRes) => {
//                             if (error) {
//                                 res.status(500).json({
//                                     message: error.message,
//                                     payload: null,
//                                     error: "some error saving the class"
//                                 });
//                             } else {
//                                 res.status(200).json({
//                                     success: true,
//                                     message: "order created successfully",
//                                     payload: {
//                                         dbRes,
//                                         key: razorpayInstance.config.key_id
//                                     },
//                                     error: null
//                                 });


//                             }
//                         });

//                     }
//                 });
//             }
//         } catch (error) {
//             if (error.isJoi === true) error.status = 422
//             next(error)
//         }
//     },

//     paymentUpdateById: async (req, res, next) => {
//         try {
//             const data = req.body
//             if (!data) {
//                 return next(createError.NotAcceptable('Invalid Query Data'))
//             }
//             data.updated_at = Date.now()
//             data.updated_by = req.user ? req.user.username : 'unauth'

//             let result = {}
//             result = await PaymentModel.findByIdAndUpdate({ _id: mongoose.Types.ObjectId(data.id) }, data)
//             if (result) {
//                 res.send({ success: true, msg: 'Data Updated Successfully' })
//             } else {
//                 res.send({ success: false, msg: 'Failed to Update Data' })
//             }
//         } catch (error) {
//             if (error.isJoi === true)
//                 return next(createError.BadRequest('Bad Request'))
//             next(error)
//         }
//     },

//     paymentDeleteDataById: async (req, res, next) => {
//         try {
//             const data = req.body
//             if (!data) {
//                 return next(createError.NotAcceptable('Invalid Query Data'))
//             }
//             data.updated_at = Date.now()
//             data.updated_by = req.user ? req.user.username : 'unauth'

//             let result = {}
//             result = await Model.findByIdAndUpdate({ _id: mongoose.Types.ObjectId(data.id) }, { $set: { is_active: false } })
//             if (result) {
//                 res.send({ success: true, msg: 'Data Deleted Successfully' })
//             } else {
//                 res.send({ success: false, msg: 'Failed to Delete Data' })
//             }
//         } catch (error) {
//             if (error.isJoi === true)
//                 return next(createError.BadRequest('Bad Request'))
//             next(error)
//         }
//     },

//     updateById: async (req, res, next) => {
//         try {
//             const data = req.body
//             if (!data) {
//                 return next(createError.NotAcceptable('Invalid Query Data'))
//             }
//             data.updated_at = Date.now()
//             data.updated_by = req.user ? req.user.username : 'unauth'

//             let result = {}
//             result = await Model.findByIdAndUpdate({ _id: mongoose.Types.ObjectId(data._id) }, data)
//             if (result) {
//                 res.send({ success: true, msg: 'Data Updated Successfully' })
//             } else {
//                 res.send({ success: false, msg: 'Failed to Update Data' })
//             }
//         } catch (error) {
//             if (error.isJoi === true)
//                 return next(createError.BadRequest('Bad Request'))
//             next(error)
//         }
//     },

//     getList: async (req, res, next) => {
//         try {
//             const page = req.body.page ? parseInt(req.body.page) : 1
//             const limit = req.body.limit ? parseInt(req.body.limit) : 1000
//             const skip = (page * limit) - limit
//             let query = req.body.query ? { ...req.body.query } : {}
//             query = {
//                 is_active: true,
//                 ...query
//             }
//             let list = []
//             const listCount = await Model.countDocuments(query)
//             list = await Model.aggregate([
//                 {
//                     $match: query
//                 },
//                 {
//                     $sort: { _id: -1 }
//                 },
//                 {
//                     $skip: skip
//                 },
//                 {
//                     $limit: limit
//                 },
//             ])
//             if (list) {
//                 res.send({ success: true, msg: 'Data Fetched', data: list, count: listCount })
//             } else {
//                 res.send({ success: false, msg: 'Failed to Fetch Data' })
//             }
//         } catch (error) {
//             if (error.isJoi === true)
//                 return next(createError.BadRequest('Bad Request'))
//             next(error)
//         }
//     },

//     kalyanResultGetList: async (req, res, next) => {
//         try {
//             const page = req.body.page ? parseInt(req.body.page) : 1
//             const limit = req.body.limit ? parseInt(req.body.limit) : 1000
//             const skip = (page * limit) - limit
//             let query = req.body.query ? { ...req.body.query } : {}
//             query = {
//                 is_active: true,
//                 ...query
//             }
//             let list = []
//             const listCount = await KalyanResultModel.countDocuments(query)
//             list = await KalyanResultModel.aggregate([
//                 {
//                     $match: query
//                 },
//                 {
//                     $sort: { _id: -1 }
//                 },
//                 {
//                     $skip: skip
//                 },
//                 {
//                     $limit: limit
//                 },
//             ])
//             if (list) {
//                 res.send({ success: true, msg: 'Data Fetched', data: list, count: listCount })
//             } else {
//                 res.send({ success: false, msg: 'Failed to Fetch Data' })
//             }
//         } catch (error) {
//             if (error.isJoi === true)
//                 return next(createError.BadRequest('Bad Request'))
//             next(error)
//         }
//     },

//     getkalyanEventList: async (req, res, next) => {
//         try {
//             const page = req.body.page ? parseInt(req.body.page) : 1
//             const limit = req.body.limit ? parseInt(req.body.limit) : 1000
//             const skip = (page * limit) - limit
//             let query = req.body.query ? { ...req.body.query } : {}
//             query = {
//                 is_active: true,
//                 ...query
//             }
//             let list = []
//             const listCount = await KalyanEventModel.countDocuments(query)
//             list = await KalyanEventModel.aggregate([
//                 {
//                     $match: query
//                 },
//                 {
//                     $sort: { created_at: 1 }
//                 },
//                 {
//                     $skip: skip
//                 },
//                 {
//                     $limit: limit
//                 },
//             ])
//             if (list) {
//                 res.send({ success: true, msg: 'Data Fetched', data: list, count: listCount })
//             } else {
//                 res.send({ success: false, msg: 'Failed to Fetch Data' })
//             }
//         } catch (error) {
//             if (error.isJoi === true)
//                 return next(createError.BadRequest('Bad Request'))
//             next(error)
//         }
//     },

//     getPaymentList: async (req, res, next) => {
//         try {
//             const page = req.body.page ? parseInt(req.body.page) : 1
//             const limit = req.body.limit ? parseInt(req.body.limit) : 1000
//             const skip = (page * limit) - limit
//             let query = req.body.query ? { ...req.body.query } : {}
//             query = {
//                 is_active: true, userId: mongoose.Types.ObjectId(query.userId)
//             }
//             let list = []
//             const listCount = await PaymentModel.countDocuments(query)
//             list = await PaymentModel.aggregate([
//                 {
//                     $match: query
//                 },
//                 {
//                     $sort: { _id: -1 }
//                 },
//                 {
//                     $skip: skip
//                 },
//                 {
//                     $limit: limit
//                 },
//             ])
//             if (list) {
//                 res.send({ success: true, msg: 'Data Fetched', data: list, count: listCount })
//             } else {
//                 res.send({ success: false, msg: 'Failed to Fetch Data' })
//             }
//         } catch (error) {
//             if (error.isJoi === true)
//                 return next(createError.BadRequest('Bad Request'))
//             next(error)
//         }
//     },

//     getEventList: async (req, res, next) => {
//         try {
//             const page = req.body.page ? parseInt(req.body.page) : 1
//             const limit = req.body.limit ? parseInt(req.body.limit) : 10
//             const skip = (page * limit) - limit
//             let query = req.body.query ? { ...req.body.query } : {}
//             query = {
//                 is_active: true,
//                 ...query
//             }

//             let list = []
//             const listCount = await EventModel.countDocuments(query)
//             list = await EventModel.aggregate([
//                 {
//                     $match: query
//                 },
//                 {
//                     $addFields: {
//                         eventId: { $toString: "$_id" },
//                     }
//                 },
//                 {
//                     $lookup: {
//                         from: 'results',
//                         localField: 'eventId',
//                         foreignField: 'eventId',
//                         foreignField: 'eventId',
//                         as: 'res'
//                     }
//                 },

//                 {
//                     $sort: { _id: -1 }
//                 },
//                 {
//                     $skip: skip
//                 },
//                 {
//                     $limit: limit
//                 },
//             ])
//             if (list) {
//                 res.send({ success: true, msg: 'Data Fetched', data: list, count: listCount })
//             } else {
//                 res.send({ success: false, msg: 'Failed to Fetch Data' })
//             }
//         } catch (error) {
//             if (error.isJoi === true)
//                 return next(createError.BadRequest('Bad Request'))
//             next(error)
//         }
//     },

//     getresultList: async (req, res, next) => {
//         try {
//             let query = req.body.query ? { ...req.body.query } : {}
//             query = {
//                 is_active: true,
//                 ...query
//             }
//             const today = new Date()
//             today.setHours(today.getHours() + 5)
//             today.setMinutes(today.getMinutes() + 30)
//             const resultDate = today.toISOString().split('T')[0]
//             let list = []
//             const listCount = await EventModel.countDocuments(query)
//             list = await EventModel.aggregate([
//                 {
//                     $match: query
//                 },
//                 {
//                     $addFields: {
//                         eventId: { $toString: "$_id" },
//                         slotDate: resultDate,
//                     }
//                 },
//                 {
//                     $lookup: {
//                         from: 'results',
//                         let: { eventId: "$eventId", slotDate: "$slotDate" },
//                         pipeline: [
//                             {
//                                 $match:
//                                 {
//                                     $expr:
//                                     {
//                                         $and:
//                                             [
//                                                 { $eq: ["$$eventId", "$eventId"] },
//                                                 { $eq: ["$slot.resultDate", "$$slotDate"] }
//                                             ]
//                                     }
//                                 }
//                             }
//                         ],
//                         as: "res"
//                     },

//                 },
//             ])
//             if (list) {
//                 res.send({ success: true, msg: 'Data Fetched', data: list, count: listCount })
//             } else {
//                 res.send({ success: false, msg: 'Failed to Fetch Data' })
//             }
//         } catch (error) {
//             if (error.isJoi === true)
//                 return next(createError.BadRequest('Bad Request'))
//             next(error)
//         }
//     },

//     getKalyanResultList: async (req, res, next) => {
//         try {
//             let query = req.body.query ? { ...req.body.query } : {}
//             query = {
//                 is_active: true,
//                 ...query
//             }
//             let today = new Date()
//             today.setHours(today.getHours() + 5)
//             today.setMinutes(today.getMinutes() + 30)
//             const resultDate = today.toISOString().split('T')[0]
//             console.log(resultDate);
//             let list = []
//             const listCount = await KalyanEventModel.countDocuments(query)
//             list = await KalyanEventModel.aggregate([
//                 {
//                     $match: query
//                 },
//                 {
//                     $addFields: {
//                         eventId: { $toString: "$_id" },
//                         slotDate: resultDate,
//                     }
//                 },
//                 {
//                     $lookup: {
//                         from: 'kalyanresults',
//                         let: { eventId: "$eventId", slotDate: "$slotDate" },
//                         pipeline: [
//                             {
//                                 $match:
//                                 {
//                                     $expr:
//                                     {
//                                         $and:
//                                             [
//                                                 { $eq: ["$$eventId", "$eventId"] },
//                                                 { $eq: ["$slot.resultDate", "$$slotDate"] }
//                                             ]
//                                     }
//                                 }
//                             }
//                         ],
//                         as: "res"
//                     },
//                 },
//             ])
//             today = new Date()
//             today.setHours(today.getHours() + 5)
//             today.setMinutes(today.getMinutes() + 30)
//             const DateString = today.toISOString().split('T')[0]
//             const ghantaString = today.toISOString().split('T')[1].split(':')[0]
//             const chotaGhantaString = today.toISOString().split('T')[1].split(':')[1]
//             list = list.map(o => {
//                 o.bid_enable = false;
//                 const [hour, minute] = o.eventTime.split(':');
//                 if (hour >= ghantaString) {
//                     if (hour == ghantaString && minute >= chotaGhantaString) {
//                         o.bid_enable = true;
//                     } else {
//                         o.bid_enable = true;
//                     }
//                 }
//                 return o;
//             })
//             if (list) {
//                 res.send({ success: true, msg: 'Data Fetched', data: list, count: listCount })
//             } else {
//                 res.send({ success: false, msg: 'Failed to Fetch Data' })
//             }
//         } catch (error) {
//             if (error.isJoi === true)
//                 return next(createError.BadRequest('Bad Request'))
//             next(error)
//         }
//     },

//     getDeletedList: async (req, res, next) => {
//         try {
//             let list = []
//             list = await Model.find({ is_active: false }, { __v: 0 })
//             if (list) {
//                 res.send({ success: true, msg: 'Data Fetched', data: list, count: list.length })
//             } else {
//                 res.send({ success: false, msg: 'Failed to Fetch Data' })
//             }
//         } catch (error) {
//             if (error.isJoi === true)
//                 return next(createError.BadRequest('Bad Request'))
//             next(error)
//         }
//     },

//     getDataById: async (req, res, next) => {
//         try {
//             const data = req.body
//             if (!data) {
//                 return next(createError.NotAcceptable('Invalid Query Data'))
//             }

//             let result = {}
//             result = await Model.findById({ _id: mongoose.Types.ObjectId(data.id) }, { __v: 0 })
//             if (result) {
//                 res.send({ success: true, msg: 'Detail Fetched', data: result })
//             } else {
//                 res.send({ success: false, msg: 'Failed to Fetch Detail' })
//             }

//         } catch (error) {
//             if (error.isJoi === true)
//                 return next(createError.BadRequest('Bad Request'))
//             next(error)
//         }
//     },

//     getEventsListById: async (req, res, next) => {
//         try {
//             const data = req.body.query
//             if (!data) {
//                 return next(createError.NotAcceptable('Invalid Query Data'))
//             }
//             let result = {}
//             result = await EventModel.findById({ _id: mongoose.Types.ObjectId(data.eventId) }, { __v: 0 })
//             if (result) {
//                 res.send({ success: true, msg: 'Detail Fetched', data: result })
//             } else {
//                 res.send({ success: false, msg: 'Failed to Fetch Detail' })
//             }

//         } catch (error) {
//             if (error.isJoi === true)
//                 return next(createError.BadRequest('Bad Request'))
//             next(error)
//         }
//     },

//     deleteDataById: async (req, res, next) => {
//         try {
//             const data = req.body
//             if (!data) {
//                 return next(createError.NotAcceptable('Invalid Query Data'))
//             }
//             data.updated_at = Date.now()
//             data.updated_by = req.user ? req.user.username : 'unauth'

//             let result = {}
//             result = await Model.findByIdAndUpdate({ _id: mongoose.Types.ObjectId(data.id) }, { $set: { is_active: false } })
//             if (result) {
//                 res.send({ success: true, msg: 'Data Deleted Successfully' })
//             } else {
//                 res.send({ success: false, msg: 'Failed to Delete Data' })
//             }
//         } catch (error) {
//             if (error.isJoi === true)
//                 return next(createError.BadRequest('Bad Request'))
//             next(error)
//         }
//     },

//     restoreDataById: async (req, res, next) => {
//         try {
//             const data = req.body
//             if (!data) {
//                 return next(createError.NotAcceptable('Invalid Query Data'))
//             }
//             data.updated_at = Date.now()
//             data.updated_by = req.user ? req.user.username : 'unauth'

//             let result = {}
//             result = await Model.findByIdAndUpdate({ _id: mongoose.Types.ObjectId(data.id) }, { $set: { is_active: true } })
//             if (result) {
//                 res.send({ success: true, msg: 'Data Restored Successfully' })
//             } else {
//                 res.send({ success: false, msg: 'Failed to Restore Data' })
//             }
//         } catch (error) {
//             if (error.isJoi === true)
//                 return next(createError.BadRequest('Bad Request'))
//             next(error)
//         }
//     },

// }


const createError = require('http-errors')
const Model = require('../models/Bid.Model')
const EventModel = require('../models/Event.Model')
const PaymentModel = require('../models/Payment.Model')
const WithdrawalModel = require('../models/Withdrawal.Model')
const KalyanEventModel = require('../models/KalyanEvent.Model')
const KalyanResultModel = require('../models/KalyanResult.Model')
const ManualPaymentModel = require('../models/ManualPayment.Model')
const ResultModel = require('../models/Result.Model')
const notificationModel = require('../models/Notification.Model')
const User = require('../models/User.model')
const { purchaseSchema, purchaseSchemaUpi } = require('../helpers/validation_schema')
const razorpayInstance = require('../helpers/razorpay')
const mongoose = require('mongoose')
const fetch = require('node-fetch')
const moment = require('moment')
const { boolean } = require('joi')

module.exports = {

    create: async (req, res, next) => {
        try {
            const data = req.body
            data.created_at = Date.now()
            data.updated_at = Date.now()
            data.created_by = req.user.username
            data.updated_by = req.user.username
            let amountUpdate = {}
            if (data.bidAmount) {
                amountUpdate = await User.updateOne({ _id: mongoose.Types.ObjectId(data.userId) }, { $inc: { wallet: "-" + data.bidAmount } })
            }
            let characters = '0123456789'
            let transactionId = ''
            let length = 8
            for (var i = 0; i < 8; i++) {
                transactionId += characters.charAt(Math.floor(Math.random() * length));
            }
            data.transactionId = transactionId
            const model = new Model(data)
            const savedModel = await model.save()
            if (savedModel) {
                res.send({ success: true, msg: 'Data inserted successfully.' })
            } else {
                res.send({ success: false, msg: 'Failed to insert data.' })
            }

        } catch (error) {
            if (error.isJoi === true) error.status = 422
            next(error)
        }
    },

    ManualPaymentAdd: async (req, res, next) => {
        try {
            const data = req.body
            data.created_at = Date.now()
            data.updated_at = Date.now()
            data.created_by = req.user.username
            data.updated_by = req.user.username

            const model = new ManualPaymentModel(data)
            const savedModel = await model.save()
            if (savedModel) {
                res.send({ success: true, msg: 'Data inserted successfully.' })
            } else {
                res.send({ success: false, msg: 'Failed to insert data.' })
            }

        } catch (error) {
            if (error.isJoi === true) error.status = 422
            next(error)
        }
    },

    withdrawalrequest: async (req, res, next) => {
        try {
            const data = req.body
            data.created_at = Date.now()
            data.updated_at = Date.now()
            data.created_by = req.user.username
            data.updated_by = req.user.username
            let amountUpdate = {}
            if (data.withdrawalAmount) {
                amountUpdate = await User.updateOne({ _id: mongoose.Types.ObjectId(data.userId) }, { $inc: { wallet: "-" + data.withdrawalAmount } })
            }
            const model = new WithdrawalModel(data)
            const savedModel = await model.save()
            if (savedModel) {
                res.send({ success: true, msg: 'Data inserted successfully.' })
            } else {
                res.send({ success: false, msg: 'Failed to insert data.' })
            }

        } catch (error) {
            if (error.isJoi === true) error.status = 422
            next(error)
        }
    },

    withdrawalrequestList: async (req, res, next) => {
        try {
            const page = req.body.page ? parseInt(req.body.page) : 1
            const limit = req.body.limit ? parseInt(req.body.limit) : 10
            const skip = (page * limit) - limit
            let query = req.body.query ? { ...req.body.query } : {}
            query = {
                is_active: true,
                ...query
            }
            let list = []
            const listCount = await WithdrawalModel.countDocuments(query)
            list = await WithdrawalModel.aggregate([
                {
                    $match: query
                },
                {
                    $sort: { _id: -1 }
                },
                {
                    $skip: skip
                },
                {
                    $limit: limit
                },
            ])
            if (list) {
                res.send({ success: true, msg: 'Data Fetched', data: list, count: listCount })
            } else {
                res.send({ success: false, msg: 'Failed to Fetch Data' })
            }
        } catch (error) {
            if (error.isJoi === true)
                return next(createError.BadRequest('Bad Request'))
            next(error)
        }
    },

    paymentCreate: async (req, res, next) => {
        try {
            let data = req.body
            const result = await purchaseSchema.validateAsync(data)
            data.created_at = Date.now()
            data.updated_at = Date.now()
            data.created_by = req.user.username
            data.updated_by = req.user.username
            // data.created_date = data.slot.bidDate
            if (result) {
                saveUserPurchase(result, res)
            }
            function saveUserPurchase(data, res) {
                var options = {
                    amount: data.amount * 100, // amount in the smallest currency unit
                    currency: "INR",
                    receipt: data.user_email,
                    payment_capture: '0'
                };
                razorpayInstance.instance.orders.create(options, function (razor_error, order) {
                    if (razor_error) {
                        res.status(417).json({
                            message: razor_error.message,
                            payload: null,
                            error: "razor pay order creation unsuccessful"
                        });
                    } else {
                        data["order"] = order;
                        const model = new PaymentModel(data)
                        model.save(async (error, dbRes) => {
                            if (error) {
                                res.status(500).json({
                                    message: error.message,
                                    payload: null,
                                    error: "some error saving the class"
                                });
                            } else {
                                res.status(200).json({
                                    success: true,
                                    message: "order created successfully",
                                    payload: {
                                        dbRes,
                                        key: razorpayInstance.config.key_id
                                    },
                                    error: null
                                });


                            }
                        });

                    }
                });
            }
        } catch (error) {
            if (error.isJoi === true) error.status = 422
            next(error)
        }
    },

    paymentCreateUpi: async (req, res, next) => {
        try {
            let data = req.body
            const result = await purchaseSchemaUpi.validateAsync(data)
            data.created_at = Date.now()
            data.updated_at = Date.now()
            data.created_by = req.user.username
            data.updated_by = req.user.username
            // data.created_date = data.slot.bidDate
            if (result) {
                const newpayment = new PaymentModel(result);
                await newpayment.save();
                return res.send({
                    success: true,
                    data: newpayment,
                })
            } else {
                throw createError.BadRequest()
            }

        } catch (error) {
            if (error.isJoi === true) error.status = 422
            next(error)
        }
    },

    paymentUpdateByIdUpi: async (req, res, next) => {
        try {
            const data = req.query;
            if (!data) {
                return next(createError.NotAcceptable('Invalid Query Data'))
            }
            data.updated_at = Date.now()
            data.updated_by = req.user ? req.user.username : 'unauth'

            let result = {}
            result = await PaymentModel.updateOne({ _id: mongoose.Types.ObjectId(data.client_txn_id) }, { $set: data })
            if (result) {
                res.send({ success: true, msg: 'Data Updated Successfully' })
            } else {
                res.send({ success: false, msg: 'Failed to Update Data' })
            }
        } catch (error) {
            if (error.isJoi === true)
                return next(createError.BadRequest('Bad Request'))
            next(error)
        }
    },

    updatePaymentstatus: async (req, res, next) => {
        try {
            const clientId = req.params.id;
            console.log(req.params);
            console.log(clientId);
            // const query = {_id: mongoose.Types.ObjectId(clientId)};
            // console.log(query);
            const payment_obj = await PaymentModel.findById(clientId);
            if (!payment_obj) {
                throw createError.BadRequest();
            }
            const created_at = payment_obj.created_at.toISOString()

            const previousStatus = payment_obj.transactionStatus;


            const response = await fetch(
                `https://upigateway.com/api/check_order_status?client_key=06f9c14c-b06c-4443-a0da-ff0923eb0951&client_txn_id=${clientId}&txn_date=${created_at.split('T')[0].split('-')[2]}-${created_at.split('T')[0].split('-')[1]}-${created_at.split('T')[0].split('-')[0]}`
            )
            const data = await response.json();

            if (!data.status) {
                throw createError.NotFound("Result Data Not Found");
            }

            const newStatus = data.data.status
            if (newStatus == 'success' && previousStatus != 'success') {
                let result2 = await User.updateOne({ _id: mongoose.Types.ObjectId(payment_obj.userId) }, { $inc: { wallet: payment_obj.amount } })
            }
            await PaymentModel.updateOne({ _id: mongoose.Types.ObjectId(clientId) }, { $set: { transactionStatus: data.data.status } })
            return res.send({
                success: true,
                status: data.data.status,
            })
        } catch (error) {
            console.log(error);
            if (error.isJoi === true)
                return next(createError.BadRequest('Bad Request'))
            next(error)
        }
    },

    paymentUpdateById: async (req, res, next) => {
        try {
            const data = req.body
            if (!data) {
                return next(createError.NotAcceptable('Invalid Query Data'))
            }
            data.updated_at = Date.now()
            data.updated_by = req.user ? req.user.username : 'unauth'

            let result = {}
            result = await PaymentModel.findByIdAndUpdate({ _id: mongoose.Types.ObjectId(data.id) }, data)
            if (result) {
                res.send({ success: true, msg: 'Data Updated Successfully' })
            } else {
                res.send({ success: false, msg: 'Failed to Update Data' })
            }
        } catch (error) {
            if (error.isJoi === true)
                return next(createError.BadRequest('Bad Request'))
            next(error)
        }
    },

    paymentDeleteDataById: async (req, res, next) => {
        try {
            const data = req.body
            if (!data) {
                return next(createError.NotAcceptable('Invalid Query Data'))
            }
            data.updated_at = Date.now()
            data.updated_by = req.user ? req.user.username : 'unauth'

            let result = {}
            result = await Model.findByIdAndUpdate({ _id: mongoose.Types.ObjectId(data.id) }, { $set: { is_active: false } })
            if (result) {
                res.send({ success: true, msg: 'Data Deleted Successfully' })
            } else {
                res.send({ success: false, msg: 'Failed to Delete Data' })
            }
        } catch (error) {
            if (error.isJoi === true)
                return next(createError.BadRequest('Bad Request'))
            next(error)
        }
    },

    updateById: async (req, res, next) => {
        try {
            const data = req.body
            if (!data) {
                return next(createError.NotAcceptable('Invalid Query Data'))
            }
            data.updated_at = Date.now()
            data.updated_by = req.user ? req.user.username : 'unauth'

            let result = {}
            result = await Model.findByIdAndUpdate({ _id: mongoose.Types.ObjectId(data._id) }, data)
            if (result) {
                res.send({ success: true, msg: 'Data Updated Successfully' })
            } else {
                res.send({ success: false, msg: 'Failed to Update Data' })
            }
        } catch (error) {
            if (error.isJoi === true)
                return next(createError.BadRequest('Bad Request'))
            next(error)
        }
    },

    getList: async (req, res, next) => {
        try {
            const page = req.body.page ? parseInt(req.body.page) : 1
            const limit = req.body.limit ? parseInt(req.body.limit) : 1000
            const skip = (page * limit) - limit
            let query = req.body.query ? { ...req.body.query } : {}
            query = {
                is_active: true,
                ...query
            }
            let list = []
            const listCount = await Model.countDocuments(query)
            list = await Model.aggregate([
                {
                    $match: query
                },
                {
                    $lookup: {
                        from: 'events',
                        let: { "searchId": { $toObjectId: "$eventId" } },
                        pipeline: [
                            { $match: { $expr: { $eq: ['$_id', '$$searchId'] } } }
                        ],
                        as: 'res'
                    }
                },
                {
                    $unwind: "$res"
                },
                {
                    $sort: { _id: -1 }
                },
                {
                    $skip: skip
                },
            ])
            list = list.map(o => {
                o.slot.bidTime = moment(o.slot.bidTime, ["h:mm A"]).format('hh:mm A')
                return o;
            }
            )
            if (list) {
                res.send({ success: true, msg: 'Data Fetched', data: list, count: listCount })
            } else {
                res.send({ success: false, msg: 'Failed to Fetch Data' })
            }
        } catch (error) {
            if (error.isJoi === true)
                return next(createError.BadRequest('Bad Request'))
            next(error)
        }
    },

    kalyanResultGetList: async (req, res, next) => {
        try {
            const page = req.body.page ? parseInt(req.body.page) : 1
            const limit = req.body.limit ? parseInt(req.body.limit) : 1000
            const skip = (page * limit) - limit
            let query = req.body.query ? { ...req.body.query } : {}
            query = {
                is_active: true,
                ...query
            }
            let list = []
            const listCount = await KalyanResultModel.countDocuments(query)
            list = await KalyanResultModel.aggregate([
                {
                    $match: query
                },
                {
                    $sort: { _id: -1 }
                },
                {
                    $skip: skip
                },
                {
                    $limit: limit
                },
            ])
            if (list) {
                res.send({ success: true, msg: 'Data Fetched', data: list, count: listCount })
            } else {
                res.send({ success: false, msg: 'Failed to Fetch Data' })
            }
        } catch (error) {
            if (error.isJoi === true)
                return next(createError.BadRequest('Bad Request'))
            next(error)
        }
    },

    getkalyanEventList: async (req, res, next) => {
        try {
            const page = req.body.page ? parseInt(req.body.page) : 1
            const limit = req.body.limit ? parseInt(req.body.limit) : 1000
            const skip = (page * limit) - limit
            let query = req.body.query ? { ...req.body.query } : {}
            query = {
                is_active: true,
                ...query
            }
            let list = []
            const listCount = await KalyanEventModel.countDocuments(query)
            list = await KalyanEventModel.aggregate([
                {
                    $match: query
                },
                {
                    $sort: { created_at: 1 }
                },
                {
                    $skip: skip
                },
                {
                    $limit: limit
                },
            ])
            if (list) {
                res.send({ success: true, msg: 'Data Fetched', data: list, count: listCount })
            } else {
                res.send({ success: false, msg: 'Failed to Fetch Data' })
            }
        } catch (error) {
            if (error.isJoi === true)
                return next(createError.BadRequest('Bad Request'))
            next(error)
        }
    },

    getPaymentList: async (req, res, next) => {
        try {
            const page = req.body.page ? parseInt(req.body.page) : 1
            const limit = req.body.limit ? parseInt(req.body.limit) : 1000
            const skip = (page * limit) - limit
            let query = req.body.query ? { ...req.body.query } : {}
            query = {
                is_active: true, userId: mongoose.Types.ObjectId(query.userId)
            }
            let list = []
            const listCount = await PaymentModel.countDocuments(query)
            list = await PaymentModel.aggregate([
                {
                    $match: query
                },
                {
                    $sort: { _id: -1 }
                },
                {
                    $skip: skip
                },
                {
                    $limit: limit
                },
            ])
            if (list) {
                res.send({ success: true, msg: 'Data Fetched', data: list, count: listCount })
            } else {
                res.send({ success: false, msg: 'Failed to Fetch Data' })
            }
        } catch (error) {
            if (error.isJoi === true)
                return next(createError.BadRequest('Bad Request'))
            next(error)
        }
    },

    getEventList: async (req, res, next) => {
        try {
            const page = req.body.page ? parseInt(req.body.page) : 1
            const limit = req.body.limit ? parseInt(req.body.limit) : 10
            const skip = (page * limit) - limit
            let query = req.body.query ? { ...req.body.query } : {}
            query = {
                is_active: true,
                ...query
            }

            let list = []
            const listCount = await EventModel.countDocuments(query)
            list = await EventModel.aggregate([
                {
                    $match: query
                },
                {
                    $addFields: {
                        eventId: { $toString: "$_id" },
                    }
                },
                {
                    $lookup: {
                        from: 'results',
                        localField: 'eventId',
                        foreignField: 'eventId',
                        foreignField: 'eventId',
                        as: 'res'
                    }
                },

                {
                    $sort: { _id: -1 }
                },
                {
                    $skip: skip
                },
                {
                    $limit: limit
                },
            ])
            if (list) {
                res.send({ success: true, msg: 'Data Fetched', data: list, count: listCount })
            } else {
                res.send({ success: false, msg: 'Failed to Fetch Data' })
            }
        } catch (error) {
            if (error.isJoi === true)
                return next(createError.BadRequest('Bad Request'))
            next(error)
        }
    },

    getresultList: async (req, res, next) => {
        try {
            let query = req.body.query ? { ...req.body.query } : {}
            let day = req.body.day ? parseInt(req.body.day) : 0
            query = {
                is_active: true,
                ...query
            }
            let today = new Date()
            today.setDate(today.getDate() - day)
            today.setHours(today.getHours() + 5)
            today.setMinutes(today.getMinutes() + 30)
            today.setHours(0);
            today.setMinutes(0);
            today.setSeconds(0);
            today.setMilliseconds(0);
            const resultDate = today
            console.log(resultDate);
            let list = []
            const listCount = await EventModel.countDocuments(query)
            list = await EventModel.aggregate([
                {
                    $match: query
                },
                {
                    $addFields: {
                        eventId: { $toString: "$_id" },
                        title: { $toUpper: "$title" },
                        slotDate: resultDate,
                    }
                },
                {
                    $lookup: {
                        from: 'results',
                        let: { eventId: "$title", slotDate: "$slotDate" },
                        pipeline: [
                            {
                                $match:
                                {
                                    $expr:
                                    {
                                        $and:
                                            [
                                                { $eq: ["$$eventId", "$event_name"] },
                                                { $eq: ["$$slotDate", "$event_date"] },
                                                { $eq: ["$is_active", true] }
                                            ]
                                    }
                                }
                            }
                        ],
                        as: "res"
                    },

                },
            ])
            today = new Date()
            today.setHours(today.getHours() + 5)
            today.setMinutes(today.getMinutes() + 30)
            const ghantaString = today.toISOString().split('T')[1].split(':')[0]
            const chotaGhantaString = today.toISOString().split('T')[1].split(':')[1]
            list = list.map(o => {
                o.bid_enable = false;
                let [hour, minute] = o.notification[0].closeTime.split(':');
                if (hour > ghantaString) {
                    o.bid_enable = true;
                } else if (hour == ghantaString && minute >= chotaGhantaString) {
                    o.bid_enable = true;
                } else {
                    o.bid_enable = false;
                }
                o.notification[0].closeTime = moment(o.notification[0].closeTime, ["h:mm A"]).format('hh:mm A')
                o.notification[0].openTime = moment(o.notification[0].openTime, ["h:mm A"]).format('hh:mm A')
                o.notification[0].openResultTime = moment(o.notification[0].openResultTime, ["h:mm A"]).format('hh:mm A')
                o.notification[0].closeResultTime = moment(o.notification[0].closeResultTime, ["h:mm A"]).format('hh:mm A')
                return o;
            })
            if (list) {
                res.send({ success: true, msg: 'Data Fetched', data: list, count: listCount })
            } else {
                res.send({ success: false, msg: 'Failed to Fetch Data' })
            }
        } catch (error) {
            if (error.isJoi === true)
                return next(createError.BadRequest('Bad Request'))
            next(error)
        }
    },

    getresultListHome: async (req, res, next) => {
        try {
            let query = req.body.query ? { ...req.body.query } : {}
            let day = req.body.day ? parseInt(req.body.day) : 0
            query = {
                is_active: true,
                ...query
            }
            let today = new Date()
            today.setDate(today.getDate() - day)
            today.setHours(today.getHours() + 5)
            today.setMinutes(today.getMinutes() + 30)
            today.setHours(0);
            today.setMinutes(0);
            today.setSeconds(0);
            today.setMilliseconds(0);
            const resultDate = today
            console.log(resultDate);
            let list = []
            const listCount = await EventModel.countDocuments(query)
            list = await EventModel.aggregate([
                {
                    $match: query
                },
                {
                    $addFields: {
                        eventId: { $toString: "$_id" },
                        title: { $toUpper: "$title" },
                        slotDate: resultDate,
                    }
                },
                {
                    $lookup: {
                        from: 'results',
                        let: { eventId: "$title", slotDate: "$slotDate" },
                        pipeline: [
                            {
                                $match:
                                {
                                    $expr:
                                    {
                                        $and:
                                            [
                                                { $eq: ["$$eventId", "$event_name"] },
                                                { $eq: ["$$slotDate", "$event_date"] },
                                                { $eq: ["$is_active", true] }
                                            ]
                                    }
                                }
                            }
                        ],
                        as: "res"
                    },

                },
            ])
            today = new Date()
            today.setHours(today.getHours() + 5)
            today.setMinutes(today.getMinutes() + 30)
            const ghantaString = today.toISOString().split('T')[1].split(':')[0]
            const chotaGhantaString = today.toISOString().split('T')[1].split(':')[1]
            list = list.map(o => {
                o.bid_enable = false;
                let [hour, minute] = o.notification[0].closeTime.split(':');
                if (hour > ghantaString) {
                    o.bid_enable = true;
                } else if (hour == ghantaString && minute >= chotaGhantaString) {
                    o.bid_enable = true;
                } else {
                    o.bid_enable = false;
                }
                o.notification[0].closeTime = moment(o.notification[0].closeTime, ["h:mm A"]).format('hh:mm A')
                o.notification[0].openTime = moment(o.notification[0].openTime, ["h:mm A"]).format('hh:mm A')
                o.notification[0].openResultTime = moment(o.notification[0].openResultTime, ["h:mm A"]).format('hh:mm A')
                o.notification[0].closeResultTime = moment(o.notification[0].closeResultTime, ["h:mm A"]).format('hh:mm A')
                return o;
            })
            if (list) {
                res.send({ success: true, msg: 'Data Fetched', data: list, count: listCount })
            } else {
                res.send({ success: false, msg: 'Failed to Fetch Data' })
            }
        } catch (error) {
            if (error.isJoi === true)
                return next(createError.BadRequest('Bad Request'))
            next(error)
        }
    },

    getKalyanResultList: async (req, res, next) => {
        try {
            let query = req.body.query ? { ...req.body.query } : {}
            query = {
                is_active: true,
                ...query
            }
            let today = new Date()
            today.setHours(today.getHours() + 5)
            today.setMinutes(today.getMinutes() + 30)
            const resultDate = today.toISOString().split('T')[0]
            console.log(resultDate);
            let list = []
            const listCount = await KalyanEventModel.countDocuments(query)
            list = await KalyanEventModel.aggregate([
                {
                    $match: query
                },
                {
                    $addFields: {
                        eventId: { $toString: "$_id" },
                        slotDate: resultDate,
                    }
                },
                {
                    $lookup: {
                        from: 'kalyanresults',
                        let: { eventId: "$eventId", slotDate: "$slotDate" },
                        pipeline: [
                            {
                                $match:
                                {
                                    $expr:
                                    {
                                        $and:
                                            [
                                                { $eq: ["$$eventId", "$eventId"] },
                                                { $eq: ["$slot.resultDate", "$$slotDate"] }
                                            ]
                                    }
                                }
                            }
                        ],
                        as: "res"
                    },
                },
            ])
            today = new Date()
            today.setHours(today.getHours() + 5)
            today.setMinutes(today.getMinutes() + 30)
            const DateString = today.toISOString().split('T')[0]
            const ghantaString = today.toISOString().split('T')[1].split(':')[0]
            const chotaGhantaString = today.toISOString().split('T')[1].split(':')[1]
            list = list.map(o => {
                o.bid_enable = false;
                let [hour, minute] = o.eventTime.split(':');
                if (hour > ghantaString) {
                    o.bid_enable = true;
                } else if (hour == ghantaString && minute >= chotaGhantaString) {
                    o.bid_enable = true;
                } else {
                    o.bid_enable = false;
                }
                o.eventTime = moment(o.eventTime, ["h:mm A"]).format('hh:mm A')
                return o;
            })
            if (list) {
                res.send({ success: true, msg: 'Data Fetched', data: list, count: listCount })
            } else {
                res.send({ success: false, msg: 'Failed to Fetch Data' })
            }
        } catch (error) {
            if (error.isJoi === true)
                return next(createError.BadRequest('Bad Request'))
            next(error)
        }
    },

    getDeletedList: async (req, res, next) => {
        try {
            let list = []
            list = await Model.find({ is_active: false }, { __v: 0 })
            if (list) {
                res.send({ success: true, msg: 'Data Fetched', data: list, count: list.length })
            } else {
                res.send({ success: false, msg: 'Failed to Fetch Data' })
            }
        } catch (error) {
            if (error.isJoi === true)
                return next(createError.BadRequest('Bad Request'))
            next(error)
        }
    },

    getDataById: async (req, res, next) => {
        try {
            const data = req.body
            if (!data) {
                return next(createError.NotAcceptable('Invalid Query Data'))
            }

            let result = {}
            result = await Model.findById({ _id: mongoose.Types.ObjectId(data.id) }, { __v: 0 })
            if (result) {
                res.send({ success: true, msg: 'Detail Fetched', data: result })
            } else {
                res.send({ success: false, msg: 'Failed to Fetch Detail' })
            }

        } catch (error) {
            if (error.isJoi === true)
                return next(createError.BadRequest('Bad Request'))
            next(error)
        }
    },

    getEventsListById: async (req, res, next) => {
        try {
            const data = req.body.query
            if (!data) {
                return next(createError.NotAcceptable('Invalid Query Data'))
            }
            let result = {}
            result = await EventModel.findById({ _id: mongoose.Types.ObjectId(data.eventId) }, { __v: 0 })

            let newObj = {}
            if (result) {
                let today = new Date()
                today.setHours(today.getHours() + 5)
                today.setMinutes(today.getMinutes() + 30)
                const ghantaString = today.toISOString().split('T')[1].split(':')[0]
                const chotaGhantaString = today.toISOString().split('T')[1].split(':')[1]
                const [hour, minute] = result.notification[0].openTime.split(':');
                newObj.bid_enable = boolean
                console.log(hour, ghantaString, minute, chotaGhantaString);
                if (hour > ghantaString) {
                    newObj.bid_enable = true;
                } else if (hour == ghantaString && minute >= chotaGhantaString) {
                    newObj.bid_enable = true;
                } else {
                    newObj.bid_enable = false;
                }
                result.notification[0].closeTime = moment(result.notification[0].closeTime, ["h:mm A"]).format('hh:mm A')
                result.notification[0].openTime = moment(result.notification[0].openTime, ["h:mm A"]).format('hh:mm A')
                result.notification[0].openResultTime = moment(result.notification[0].openResultTime, ["h:mm A"]).format('hh:mm A')
                result.notification[0].closeResultTime = moment(result.notification[0].closeResultTime, ["h:mm A"]).format('hh:mm A')
            }
            result = { result, ...newObj }
            if (result) {
                res.send({ success: true, msg: 'Detail Fetched', data: result })
            } else {
                res.send({ success: false, msg: 'Failed to Fetch Detail' })
            }

        } catch (error) {
            if (error.isJoi === true)
                return next(createError.BadRequest('Bad Request'))
            next(error)
        }
    },

    deleteDataById: async (req, res, next) => {
        try {
            const data = req.body
            if (!data) {
                return next(createError.NotAcceptable('Invalid Query Data'))
            }
            data.updated_at = Date.now()
            data.updated_by = req.user ? req.user.username : 'unauth'

            let result = {}
            result = await Model.findByIdAndUpdate({ _id: mongoose.Types.ObjectId(data.id) }, { $set: { is_active: false } })
            if (result) {
                res.send({ success: true, msg: 'Data Deleted Successfully' })
            } else {
                res.send({ success: false, msg: 'Failed to Delete Data' })
            }
        } catch (error) {
            if (error.isJoi === true)
                return next(createError.BadRequest('Bad Request'))
            next(error)
        }
    },

    restoreDataById: async (req, res, next) => {
        try {
            const data = req.body
            if (!data) {
                return next(createError.NotAcceptable('Invalid Query Data'))
            }
            data.updated_at = Date.now()
            data.updated_by = req.user ? req.user.username : 'unauth'

            let result = {}
            result = await Model.findByIdAndUpdate({ _id: mongoose.Types.ObjectId(data.id) }, { $set: { is_active: true } })
            if (result) {
                res.send({ success: true, msg: 'Data Restored Successfully' })
            } else {
                res.send({ success: false, msg: 'Failed to Restore Data' })
            }
        } catch (error) {
            if (error.isJoi === true)
                return next(createError.BadRequest('Bad Request'))
            next(error)
        }
    },

    ManualPaymentgetList: async (req, res, next) => {
        try {
            const page = req.body.page ? parseInt(req.body.page) : 1
            const limit = req.body.limit ? parseInt(req.body.limit) : 1000
            const skip = (page * limit) - limit
            let query = req.body.query ? { ...req.body.query } : {}
            query = {
                is_active: true,
                userId: mongoose.Types.ObjectId(query.userId)
            }
            let list = []
            const listCount = await ManualPaymentModel.countDocuments(query)
            list = await ManualPaymentModel.aggregate([
                {
                    $match: query
                },
                {
                    $sort: { _id: -1 }
                },
                {
                    $skip: skip
                },
                {
                    $limit: limit
                },
            ])
            if (list) {
                res.send({ success: true, msg: 'Data Fetched', data: list, count: listCount })
            } else {
                res.send({ success: false, msg: 'Failed to Fetch Data' })
            }
        } catch (error) {
            if (error.isJoi === true)
                return next(createError.BadRequest('Bad Request'))
            next(error)
        }
    },

    manualPaymentTnxUpdateById: async (req, res, next) => {
        try {
            const data = req.body
            if (!data) {
                return next(createError.NotAcceptable('Invalid Query Data'))
            }
            data.updated_at = Date.now()
            data.updated_by = req.user ? req.user.username : 'unauth'

            let result = {}
            result = await ManualPaymentModel.findByIdAndUpdate({ _id: mongoose.Types.ObjectId(data._id) }, data)
            if (result) {
                res.send({ success: true, msg: 'Data Updated Successfully' })
            } else {
                res.send({ success: false, msg: 'Failed to Update Data' })
            }
        } catch (error) {
            if (error.isJoi === true)
                return next(createError.BadRequest('Bad Request'))
            next(error)
        }
    },

    validateBidStatus: async (req, res, next) => {
        try {
            const data = req.body.query
            if (!data) {
                return next(createError.NotAcceptable('Invalid Query Data'))
            }
            let result = {}
            result = await EventModel.findById({ _id: mongoose.Types.ObjectId(data.eventId) }, { title: 1 })
            let bidResult = []
            if (result) {
                const todayDate = new Date()
                todayDate.setHours(todayDate.getHours() + 5);
                todayDate.setMinutes(todayDate.getMinutes() + 30);
                todayDate.setHours(0);
                todayDate.setMinutes(0);
                todayDate.setSeconds(0);
                todayDate.setMilliseconds(0);
                bidResult = await ResultModel.find({ event_name: result.title.toUpperCase(), event_date: todayDate, data_set: "open" })
            }
            if (bidResult) {
                res.send({ success: true, msg: 'Detail Fetched', data: bidResult })
            } else {
                res.send({ success: false, msg: 'Failed to Fetch Detail' })
            }

        } catch (error) {
            if (error.isJoi === true)
                return next(createError.BadRequest('Bad Request'))
            next(error)
        }
    },
    getNotificationList: async (req, res, next) => {
        try {
            const page = req.body.page ? parseInt(req.body.page) : 1
            const limit = req.body.limit ? parseInt(req.body.limit) : 10
            const skip = (page * limit) - limit
            let query = req.body.query ? { ...req.body.query } : {}
            query = {
                is_active: true,
                ...query
            }

            let list = []
            const listCount = await notificationModel.countDocuments(query)
            list = await notificationModel.aggregate([
                {
                    $match: query
                },
                {
                    $addFields:
                    {
                        title: { $toUpper: "$title" }
                    }
                },
                {
                    $sort: { _id: -1 }
                },
                {
                    $skip: skip
                },
                {
                    $limit: limit
                },
            ])
            if (list) {
                res.send({ success: true, msg: 'Data Fetched', data: list, count: listCount })
            } else {
                res.send({ success: false, msg: 'Failed to Fetch Data' })
            }
        } catch (error) {
            if (error.isJoi === true)
                return next(createError.BadRequest('Bad Request'))
            next(error)
        }
    },

}
