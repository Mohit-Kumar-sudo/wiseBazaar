const createError = require('http-errors')
const Model = require('../models/Result.Model')
const EventModel = require('../models/Event.Model')
const BidModel = require('../models/Bid.Model')
const UserModel = require('../models/User.Model')
const mongoose = require('mongoose')
const fs = require('fs')

module.exports = {

    create: async (req, res, next) => {
        try {
            const data = req.body
            data.created_at = Date.now()
            data.updated_at = Date.now()
            data.created_by = req.user.username
            data.updated_by = req.user.username
            console.log(data);
            const eventData = await EventModel.findById(data.eventId, { "notification.closeResultDay": 1 })
            const closeResultDay = eventData.notification[0].closeResultDay
            if (closeResultDay == '1' && data.data_set == 'close') {
                data.event_date = new Date(data.event_date)
                data.event_date.setDate(data.event_date.getDate() - 1)
            }
            data.event_date = data.event_date.toString()
            const result = await Model.find({ event_name: data.event_name, event_date: data.event_date, data_set: data.data_set, is_active: true })
            if (result && result.length) {
                throw createError.NotAcceptable('Data already publised')
            }
            if (data.data_set == 'open') {
                const bidTypes = [
                    'single-ank',
                    'single-patti',
                    'double-patti',
                    'tripple-patti',
                ]
                const bidMultipliers = [
                    9.5,
                    150,
                    300,
                    600,
                ]
                let counter = 0;
                const statusUpdate = await BidModel.updateMany({ eventId: data.eventId, bidType: data.data_set, "slot.bidDate": data.event_date.split("T")[0], is_active: true }, { $set: { bidStatus: 'Losser' } })
                for (const betType of bidTypes) {
                    console.log(betType);
                    let query = { eventId: data.eventId, bidType: data.data_set, betType, "slot.bidDate": data.event_date.split("T")[0], is_active: true }
                    if (betType == 'single-ank') {
                        query["userInput.userInputValue"] = data.digit
                    }
                    else if (betType == 'single-patti') {
                        query["userInput.userInputValue"] = data.patti
                    }
                    else if (betType == 'double-patti') {
                        query["userInput.userInputValue"] = data.patti
                    }
                    else if (betType == 'tripple-patti') {
                        query["userInput.userInputValue"] = data.patti
                    }
                    await updateWinnerData(query, bidMultipliers[counter]);
                    counter++;
                }
            } else {
                const statusUpdate = await BidModel.updateMany({ eventId: data.eventId, bidType: data.data_set, "slot.bidDate": data.event_date.split("T")[0], is_active: true }, { $set: { bidStatus: 'Losser' } })
                const bidTypes = [
                    'single-ank',
                    'jodi',
                    'single-patti',
                    'double-patti',
                    'tripple-patti',
                    'half-sangam',
                    'full-sangam'
                ]
                const bidMultipliers = [
                    9.5,
                    95,
                    150,
                    300,
                    600,
                    1000,
                    10000
                ]
                let counter = 0;
                for (const betType of bidTypes) {
                    let query = { eventId: data.eventId, bidType: data.data_set, betType, "slot.bidDate": data.event_date.split("T")[0], is_active: true }
                    if (betType == 'single-ank') {
                        query["userInput.userInputValue"] = data.digit
                    }
                    else if (betType == 'jodi') {
                        query["userInput.userInputValue"] = data.open_digit + "" + data.digit
                    }
                    else if (betType == 'single-patti') {
                        query["userInput.userInputValue"] = data.patti
                    }
                    else if (betType == 'double-patti') {
                        query["userInput.userInputValue"] = data.patti
                    }
                    else if (betType == 'tripple-patti') {
                        query["userInput.userInputValue"] = data.patti
                    }
                    else if (betType == 'full-sangam') {
                        query["userInput.openPanna"] = data.open_patti
                        query["userInput.closePanna"] = data.patti
                    }
                    if (betType == 'half-sangam') {
                        query["userInput.openPanna"] = data.open_patti
                        query["userInput.closeDigit"] = data.digit
                        query["bidType"] = 'open patti close digit'
                        // const resData = await BidModel.updateMany(query, {$set: {}});
                        await updateWinnerData(query, bidMultipliers[counter]);
                        delete query["userInput.openPanna"]
                        delete query["userInput.closeDigit"]
                        delete query["bidType"]
                        query["userInput.openDigit"] = data.open_digit
                        query["userInput.closePanna"] = data.patti
                        query["bidType"] = 'open digit close patti'
                        // const resData2 = await BidModel.countDocuments(query);
                        await updateWinnerData(query, bidMultipliers[counter]);
                        // console.log(resData2)
                    } else {
                        await updateWinnerData(query, bidMultipliers[counter]);
                    }
                    counter++;
                }
            }
            async function updateWinnerData(query, multiplier) {
                let bids = await BidModel.find(query, { _id: 1, bidAmount: 1, userId: 1, eventId: 1 })
                console.log('bids', bids);
                for (let i = 0; i < bids.length; i++) {
                    const b = bids[i];
                    query._id = mongoose.Types.ObjectId(b._id)
                    const winningAmount = b.bidAmount * multiplier
                    const bidWindStatusUpdate = await BidModel.updateOne(query, { $set: { winingAmount: winningAmount, bidStatus: "Winner" } })
                    let user = await UserModel.updateOne({ _id: mongoose.Types.ObjectId(b.userId) }, { $inc: { wallet: winningAmount } })
                    delete query._id
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
            console.log(error);
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
            const limit = req.body.limit ? parseInt(req.body.limit) : 1000
            const skip = (page * limit) - limit
            let query = req.body.query ? { ...req.body.query } : {}
            const eventName = query.data.event_name.toLowerCase()
            const eventData = await EventModel.findOne({ title: eventName, is_active: true })
            today = new Date()
            today.setHours(today.getHours() + 5)
            today.setMinutes(today.getMinutes() + 30)
            const ghantaString = today.toISOString().split('T')[1].split(':')[0]
            const chotaGhantaString = today.toISOString().split('T')[1].split(':')[1]
            let [hour, minute] = eventData.notification[0].openTime.split(':');
            if (eventData.notification[0].closeResultDay == '1' && hour > ghantaString) {
                query.data.event_date = new Date(query.data.event_date)
                query.data.event_date.setDate(query.data.event_date.getDate() - 1)
            }
            console.log(query.data);
            query.data.event_date = query.data.event_date.toString()
            query = {
                is_active: true,
                ...query.data
            }
            let list = []
            const listCount = await Model.countDocuments(query)
            list = await Model.find(query)
            if (list) {
                res.send({ success: true, msg: 'Data Fetched', data: list, count: listCount })
            } else {
                res.send({ success: false, msg: 'Failed to Fetch Data' })
            }
        } catch (error) {
            console.log(error);
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
            console.log(data);
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

    UpdateBidResultInDB: async (req, res, next) => {
        try {
            const nums = await fs.readFileSync('nums.json')
            console.log(nums.toString());
            let resultObject = { 'adminId': "", 'eventId': "", 'result': [], 'slot': [] }

            return;
        } catch (error) {
            if (error.isJoi === true)
                return next(createError.BadRequest('Bad Request'))
            next(error)
        }
    },


}
