const createError = require('http-errors')
const User = require('../models/User.model')
const { authSchema, loginSchema, mpinSchema, validateSchema } = require('../helpers/validation_schema')
const { signAccessToken, signRefreshToken, verifyRefreshToken } = require('../helpers/jwt_helper')
const client = require('../helpers/init_redis')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

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

    getDataById: async (req, res, next) => {
        try {
            const data = req.body
            if (!data) {
                return next(createError.NotAcceptable('Invalid Query Data'))
            }
            let result = {}
            result = await User.findById({ _id: mongoose.Types.ObjectId(data.id) }, { wallet: 1, username: 1, spin: 1, spin_enable: 1 })
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

    updateDataById: async (req, res, next) => {
        try {
            const data = req.body
            if (!data) {
                return next(createError.NotAcceptable('Invalid Query Data'))
            }
            console.log(data);
            let result = {}
            result = await User.findByIdAndUpdate({ _id: mongoose.Types.ObjectId(data.id) }, data)
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

    login: async (req, res, next) => {
        try {
            const result = await loginSchema.validateAsync(req.body)
            if (result) {
                user = await User.findOne({ mobile: result.mobile, is_active: true })
                // console.log('User By Email :', user)
                if (!user) {
                    user = await User.findOne({ username: result.mobile, is_active: true })
                    if (!user) {
                        throw createError.NotFound('User not registered')
                    }
                }
            } else {
                throw createError.NotAcceptable('No query Data')
            }
            console.log(user);
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
                mobile: user.mobile,
                username: user.username,
                wallet: user.wallet
            }
            res.send({ success: true, msg: 'Login Successfull', accessToken, refreshToken, user: userDataSend })
        } catch (error) {
            if (error.isJoi === true) return next(createError.BadRequest("Invalid Username/Password"))
            next(error)
        }
    },
    loginByPin: async (req, res, next) => {
        try {
            const result = await loginSchema.validateAsync(req.body)
            if (result) {
                user = await User.findOne({ mobile: result.mobile, is_active: true })
                // console.log('User By Email :', user)
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
            const isMatch = await user.isValidSpin(result.password)
            if (!isMatch) throw createError.Unauthorized("Username/Password not valid")
            const accessToken = await signAccessToken(user.id)
            const refreshToken = await signRefreshToken(user.id)
            // res.send({ accesssToken, refreshToken })
            const userDataSend = {
                id: user._id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                mobile: user.mobile,
                username: user.username,
                wallet: user.wallet
            }
            res.send({ success: true, msg: 'Login Successfull', accessToken, refreshToken, user: userDataSend })
        } catch (error) {
            console.log(error);
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


    forgetPapersetterPaasword: async (req, res, next) => {
        try {
            const result = req.body
            result.updated_at = Date.now()
            result.updated_by = result.email
            let user = {}
            if (result) {
                user = result
            } else {
                throw createError.NotFound('No query Data')
            }
            // console.log("user", user);
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(result.password, salt)
            const newPassword = hashedPassword
            result.password = newPassword

            updatedUser = await User.findByIdAndUpdate({ _id: mongoose.Types.ObjectId(user._id) }, { $set: { is_password_reset: true, ...result } })
            // console.log("updatedUser", updatedUser);
            res.send({ success: true, msg: 'Password updated successfully' })
        } catch (error) {
            if (error.isJoi === true)
                return next(createError.BadRequest("could not match password"))
            next(error)
        }
    },


    validatePassword: async (req, res, next) => {
        try {
            const result = await mpinSchema.validateAsync(req.body)
            // const result = req.body
            let user = {}
            if (result) {
                user = await User.findOne({ mobile: result.username, is_active: true })
                if (!user) {
                    user = await User.findOne({ username: result.username, is_active: true })
                    if (!user) {
                        throw createError.NotFound('User not registered')
                    }
                }
            } else {
                throw createError.NotAcceptable('No query Data')
            }
            const isMatch = await user.isValidPassword(result.password)
            if (!isMatch)
                throw createError.NotAcceptable('Username/password not valid')

            res.send({ success: true, msg: 'Authentication Successfull', data: true })
        } catch (error) {
            if (error.isJoi === true)
                return next(createError.BadRequest('Invalid Username/Password'))
            next(error)
        }
    },


    validatePin: async (req, res, next) => {
        try {
            const result = req.body
            let user = {}
            if (result) {
                user = await User.findOne({ email: result.email })
                if (!user) {
                    user = await User.findOne({ username: result.email })
                    if (!user) {
                        throw createError.NotFound('User not registered')
                    }
                }
            } else {
                throw createError.NotAcceptable('No query Data')
            }
            const isMatch = await user.isValidSpin(result.spin)
            if (!isMatch)
                throw createError.NotAcceptable('Pin not valid')

            res.send({ success: true, msg: 'Authentication Successfull' })
        } catch (error) {
            if (error.isJoi === true)
                return next(createError.BadRequest('Invalid Username/Password'))
            next(error)
        }
    },

    generatePin: async (req, res, next) => {
        try {
            const result = req.body
            if (!result) {
                return next(createError.NotAcceptable('Invalid Query Data'))
            }
            result.updated_at = Date.now()
            result.updated_by = req.user.username

            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(result.spin, salt)
            const newPin = hashedPassword
            result.spin = newPin
            updatedUser = await User.findByIdAndUpdate({ _id: mongoose.Types.ObjectId(result._id) }, { $set: { spin: result.spin } })
            res.send({ success: true, msg: 'Pin Generated successfully', })
        } catch (error) {
            if (error.isJoi === true)
                return next(createError.BadRequest("could not match password"))
            next(error)
        }
    },

    spinAvail: async (req, res, next) => {
        try {
            const result = req.body
            let userSpin;
            if (result) {
                user = await User.findOne({ mobile: result.mobile, is_active: true })
                if (user) {
                    userSpin = await User.findOne({ mobile: result.mobile, is_active: true, spin_enable: true })
                }
                // console.log('User By Email :', user)
                if (!user) {
                    user = await User.findOne({ username: result.mobile, is_active: true })
                    if (user) {
                        userSpin = await User.findOne({ username: result.mobile, is_active: true, spin_enable: true })
                    }
                    //  else {
                    //     return res.send({ success: false, msg: 'Enter valid username/mobile number' })
                    // }
                }
                if (user && userSpin) {
                    res.send({ success: true, data: true, msg: 'Enter MPIN for login' })
                } else if (user && !userSpin) {
                    res.send({ success: true, msg: 'Enter passsword for login' })
                } else {
                    res.send({ success: false })
                }
            } else {
                throw createError.NotAcceptable('No query Data')
            }
        } catch (error) {
            if (error.isJoi === true)
                return next(createError.BadRequest("could not match password"))
            next(error)
        }
    },

    resetMpin: async (req, res, next) => {
        try {
            const result = await mpinSchema.validateAsync(req.body)
            let user = {}
            if (result) {
                user = await User.findOne({ username: result.username, is_active: true })
                if (!user) {
                    user = await User.findOne({ username: result.username, is_active: true })
                    if (!user) {
                        throw createError.NotFound('User not registered')
                    }
                }
            } else {
                throw createError.NotAcceptable('No query Data')
            }
            const isMatch = await user.isValidPassword(result.password)
            if (!isMatch)
                throw createError.NotAcceptable('Username/password not valid')

            if (isMatch) {
                user = await User.updateOne({ username: result.username, is_active: true }, { $set: { spin: "", spin_enable: false } })
                res.send({ success: true, msg: 'Authentication Successfull, MPIN reset done', data: true })
            }
        } catch (error) {
            console.log(error)
            if (error.isJoi === true)
                return next(createError.BadRequest('Invalid Username/Password'))
            next(error)
        }
    },
}