const createError = require('http-errors')
const Model = require('../models/Event.Model')
const mongoose = require('mongoose')
const moment = require('moment')

module.exports = {

    create: async (req, res, next) => {
        try {
            const data = req.body
            data.created_at = Date.now()
            data.updated_at = Date.now()
            data.created_by = req.user.username
            data.updated_by = req.user.username

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

    getList: async (req, res, next) => {
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
                    $addFields:
                    {
                        title: { $toUpper: "$title" }
                    }
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

    getresultList: async (req, res, next) => {
        try {
            let query = req.body.query ? { ...req.body.query } : {}
            query = {
                is_active: true,
                ...query
            }
            let today = new Date()
            today.setHours(today.getHours() + 5)
            today.setMinutes(today.getMinutes() + 30)
            today.setHours(0);
            today.setMinutes(0);
            today.setSeconds(0);
            today.setMilliseconds(0);
            const resultDate = today
            let list = []
            const listCount = await Model.countDocuments(query)
            list = await Model.aggregate([
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

}
