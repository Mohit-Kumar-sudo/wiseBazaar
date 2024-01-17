const Joi = require('joi')

const authSchema = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string(),
    username: Joi.string().lowercase().required(),
    mobile: Joi.required(),
    role: Joi.required(),
    password: Joi.string().min(2).required(),
})

const userSchema = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string(),
    username: Joi.string().lowercase().required(),
    mobile: Joi.required(),
    password: Joi.string().min(2).required(),
})

const loginSchema = Joi.object({
    mobile: Joi.required(),
    password: Joi.string().min(2).required(),
})

const approveWalletSchema = Joi.object({
    status: Joi.string().required(),
    transactionStatus: Joi.string().required(),
    _id: Joi.string().required()
})

module.exports = {
    authSchema,
    loginSchema,
    approveWalletSchema,
    userSchema
}