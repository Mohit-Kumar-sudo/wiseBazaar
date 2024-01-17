const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ManualPaymentSchema = new Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    recipient_name: {
        type: String
    },
    upiId: {
        type: String
    },
    recipient_email: {
        type: String
    },
    payDate: {
        type: String,
    },
    payTime: {
        type: String,
    },
    amount: {
        type: Number,
        required: true
    },
    user_mobile: {
        type: String
    },
    user_name: {
        type: String
    },
    transactionId: {
        type: String
    },
    transactionStatus: {
        type: String,
        default: 'Pending'
    },
    is_active: {
        type: Boolean,
        default: true,
        index: true
    },
    status: {
        type: String,
        default: 'Pending'
    },
    enable: {
        type: Boolean,
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    created_date: {
        type: Date
    },
    created_by: {
        type: String,
        default: 'self'
    },
    updated_at: {
        type: Date,
        default: Date.now()
    },
    updated_date: {
        type: Date,
    },
    updated_by: {
        type: String,
        default: 'self'
    },
})

ManualPaymentSchema.index({
    payDate: 1,
    payTime: 1,
    payAmount: 1,
})


const ManPay = mongoose.model('manualpayment', ManualPaymentSchema)

ManPay.createIndexes()
ManPay.ensureIndexes()

module.exports = ManPay
