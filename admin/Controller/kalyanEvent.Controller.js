const createError = require('http-errors')
const Model = require('../models/KalyanEvent.Model')
const mongoose = require('mongoose')

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

    getKalyanResultList: async (req, res, next) => {
        try {
            let query = req.body.query ? { ...req.body.query } : {}
            query = {
                is_active: true,
                ...query
            }
            const today = new Date()
            today.setHours(today.getHours() + 5)
            today.setMinutes(today.getMinutes() + 30)
            const resultDate = today.toISOString().split('T')[0]
            let list = []
            const listCount = await Model.countDocuments(query)
            list = await Model.aggregate([
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
