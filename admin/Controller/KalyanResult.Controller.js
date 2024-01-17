const createError = require('http-errors')
const Model = require('../models/KalyanResult.Model')
const KalyanBidModel = require('../models/kalyanStarLine.Model')
const UserModel = require('../models/User.Model')
const mongoose = require('mongoose')

module.exports = {

    create: async (req, res, next) => {
        try {
            const data = req.body
            data.created_at = Date.now()
            data.updated_at = Date.now()
            data.created_by = req.user.username
            data.updated_by = req.user.username
            const result = await Model.find({ 'slot.resultDate': data.slot.resultDate, eventId: data.eventId })
            if (result && result.length) {
                throw createError.NotAcceptable('Data already publised')
            }
            let bids = []
            bids = await KalyanBidModel.find({ eventId: data.eventId, 'slot.bidDate': data.slot.resultDate })
            for (const b of bids) {
                if (b.userInput.singleDigit == data.result.singleDigit) {
                    const singleDigitWin = b.bidAmount * 10

                    const bidWindStatusUpdate = await KalyanBidModel.updateOne({ eventId: data.eventId, userId: b.userId, 'slot.bidDate': data.slot.resultDate, 'userInput.singleDigit': data.result.singleDigit }, { $set: { winingAmount: singleDigitWin, biStatus: "Winner" } })

                    let user = await UserModel.updateOne({ _id: mongoose.Types.ObjectId(b.userId) }, { $inc: { wallet: singleDigitWin } })
                }
                if (b.userInput.singlePatti == data.result.patti) {
                    const singlePattiWin = b.bidAmount * 160
                    const bidStatusUpdate = await KalyanBidModel.updateOne({ eventId: data.eventId, userId: b.userId, 'slot.bidDate': data.slot.resultDate, 'userInput.singlePatti': data.result.patti }, { $set: { winingAmount: singlePattiWin, biStatus: "Winner" } })

                    let user = await UserModel.updateOne({ _id: mongoose.Types.ObjectId(b.userId) }, { $inc: { wallet: singlePattiWin } })
                }
                if (b.userInput.doublePatti == data.result.patti) {
                    const doublePattiWin = b.bidAmount * 320
                    console.log("single Patti", b.userId, doublePattiWin);

                    const bidStatusUpdate = await KalyanBidModel.updateOne({ eventId: data.eventId, userId: b.userId, 'slot.bidDate': data.slot.resultDate, 'userInput.doublePatti': data.result.patti }, { $set: { winingAmount: doublePattiWin, biStatus: "Winner" } })

                    let user = await UserModel.updateOne({ _id: mongoose.Types.ObjectId(b.userId) }, { $inc: { wallet: doublePattiWin } })
                }
                if (b.userInput.tripplePatti == data.result.patti) {
                    const tripplePattiWin = b.bidAmount * 1000
                    console.log("single Patti", b.userId, tripplePattiWin);

                    const bidStatusUpdate = await KalyanBidModel.updateOne({ eventId: data.eventId, userId: b.userId, 'slot.bidDate': data.slot.resultDate, 'userInput.tripplePatti': data.result.patti }, { $set: { winingAmount: tripplePattiWin, biStatus: "Winner" } })

                    let user = await UserModel.updateOne({ _id: mongoose.Types.ObjectId(b.userId) }, { $inc: { wallet: tripplePattiWin } })
                }
            }
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

    getTodayResult: async (req, res, next) => {
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
            const listCount = await Model.countDocuments(query)
            list = await Model.aggregate([
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
}
