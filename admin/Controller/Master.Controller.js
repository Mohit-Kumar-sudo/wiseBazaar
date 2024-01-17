const createError = require('http-errors')
const User = require('../models/Master.Model')
const { authSchema, loginSchema } = require('../helpers/validation_schema')
const { signAccessToken, signRefreshToken, verifyRefreshToken } = require('../helpers/jwt_helper')
const client = require('../helpers/init_redis')


module.exports = {
    register: async (req, res, next) => {
        try {
            const result = await authSchema.validateAsync(req.body)
            console.log(result);

            const doesExist = await User.findOne({ mobile: result.mobile })
            if (doesExist) throw createError.Conflict(`Mobile is already been registerd `)

            const user = new User(result)
            const savedUser = await user.save()
            const accessToken = await signAccessToken(savedUser.id)
            const refreshToken = await signRefreshToken(savedUser.id)
            res.send({ accessToken, refreshToken })
        } catch
        (error) {
            if (error.isJoi === true) error.status = 422
            next(error)
        }

    },

    login: async (req, res, next) => {
        try {
            const result = await loginSchema.validateAsync(req.body)
            if (result) {
                user = await User.findOne({ mobile: result.mobile })
                // console.log('User By Email :', user)
                if (!user) {
                    user = await User.findOne({ username: result.mobile })
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
                role:user.role,
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
    }
}