const Joi = require('joi')

const authSchema = Joi.object({
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

const mpinSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().min(2).required(),
})

const purchaseSchema = Joi.object().keys({
    userId: Joi.string().required(),
    amount: Joi.number().required(),
    recipient_name: Joi.string(),
    recipient_email: Joi.string(),
    user_mobile: Joi.string(),
    user_name: Joi.string(),
    user_email: Joi.string(),
    payDate: Joi.string(),
    payTime: Joi.string(),
})
const purchaseSchemaUpi = Joi.object().keys({
    userId: Joi.string().required(),
    amount: Joi.number().required(),
    upiId: Joi.string().required(),
    recipient_name: Joi.string(),
    recipient_email: Joi.string(),
    user_mobile: Joi.string(),
    user_name: Joi.string(),
    user_email: Joi.string(),
    payDate: Joi.string(),
    payTime: Joi.string(),
})

module.exports = {
    authSchema,
    loginSchema,
    purchaseSchema,
    purchaseSchemaUpi,
    mpinSchema
}