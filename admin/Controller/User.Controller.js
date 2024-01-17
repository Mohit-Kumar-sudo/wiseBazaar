const createError = require('http-errors')
const User = require('../models/User.Model')
const { userSchema, loginSchema } = require('../helpers/validation_schema')
const { signAccessToken, signRefreshToken, verifyRefreshToken } = require('../helpers/jwt_helper')
const client = require('../helpers/init_redis')
const mongoose = require('mongoose')


module.exports = {
    register: async (req, res, next) => {
        try {
            const result = await userSchema.validateAsync(req.body)
            const doesExist = await User.findOne({ mobile: result.mobile })
            if (doesExist) throw createError.Conflict(`Mobile is already been registerd `)
            const user = new User(result)
            const savedUser = await user.save()
            const accessToken = await signAccessToken(savedUser.id)
            const refreshToken = await signRefreshToken(savedUser.id)
            if (accessToken, refreshToken) {
                res.send({ success: true, msg: 'User Created' })
            } else {
                res.send({ success: false, msg: 'Data not found' })
            }
        } catch
        (error) {
            if (error.isJoi === true) error.status = 422
            next(error)
        }

    },

    login: async (req, res, next) => {
        try {
            console.log(req.body);
            const result = await loginSchema.validateAsync(req.body)
            if (result) {
                user = await User.findOne({ mobile: result.mobile })
                console.log('User By mobile :', user)
                if (!user) {
                    user = await User.findOne({ username: result.mobile, is_active: true })
                    if (!user) {
                        throw createError.NotFound('User not registered')
                    }
                }
            } else {
                throw createError.NotAcceptable('No query Data')
            }
            // console.log(user);
            const isMatch = await user.isValidPassword(result.password)
            if (!isMatch) throw createError.Unauthorized("Username/Password not valid")
            const accessToken = await signAccessToken(user.id)
            const refreshToken = await signRefreshToken(user.id)
            // res.send({ accesssToken, refreshToken })
            const userDataSend = {
                id: user._id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                role: user.role,
                mobile: user.mobile,
                username: user.username
            }
            res.send({ success: true, msg: 'Login Successfull', accessToken, refreshToken, user: userDataSend })
        } catch (error) {
            if (error.isJoi === true) return next(createError.BadRequest("Invalid Username/Password"))
            next(error)
        }
    },

    refreshToken: async (req, res, next) => {
        try {
            const { refreshToken } = req.body
            if (!refreshToken) throw createError.BadRequest()
            const userId = await verifyRefreshToken(refreshToken)

            const accessToken = await signAccessToken(userId)
            const refToken = await signRefreshToken(userId)
            res.send({ accessToken: accessToken, refreshToken: refToken })
        } catch (error) {
            next(error)
        }
    },

    logout: async (req, res, next) => {
        try {
            const { refreshToken } = req.body
            if (!refreshToken) throw createError.BadRequest()
            const userId = await verifyRefreshToken(refreshToken)
            client.DEL(userId, (err, val) => {
                if (err) {
                    console.log(err.message);
                    throw createError.InternalServerError()
                }
                console.log(val);
                res.sendStatus(204)
            })
        } catch (error) {
            next(error)
        }
    },

    getList: async (req, res, next) => {
        try {
            const page = req.body.page ? parseInt(req.body.page) : 1
            const limit = req.body.limit ? parseInt(req.body.limit) : 10
            const skip = (page * limit) - limit
            let query = req.body.query ? { ...req.body.query } : {}
            if (query.first_name) {
                query.first_name = { $regex: new RegExp(query.first_name, "i") }
            }
            query = {
                is_active: true, ...query
            }
            let list = []
            const listCount = await User.countDocuments(query)
            list = await User.aggregate([
                {
                    $match: query
                },
                {
                    $sort: { first_name: 1 }
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

    deleteDataById: async (req, res, next) => {
        try {

            const data = req.body
            if (!data) {
                return next(createError.NotAcceptable('Invalid Query Data'))
            }
            data.updated_at = Date.now()
            data.updated_by = req.user ? req.user.username : 'unauth'
            let result = {}
            result = await User.findByIdAndUpdate({ _id: mongoose.Types.ObjectId(data.id) }, { $set: { is_active: false } })
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

    addFundById: async (req, res, next) => {
        try {
            const data = req.body
            if (!data) {
                return next(createError.NotAcceptable('Invalid Query Data'))
            }
            data.updated_at = Date.now()
            data.updated_by = req.user ? req.user.username : 'unauth'

            let result = {}
            result = await User.findByIdAndUpdate({ _id: mongoose.Types.ObjectId(data.id) }, { $inc: { wallet: data.amount } })
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
}