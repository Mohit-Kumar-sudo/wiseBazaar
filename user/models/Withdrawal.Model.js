const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema

const withdrawalSchema = new Schema({
    userId: {
        type: String,
        required: true,
        trim: true
    },
    upiNumber: {
        type: Number,
        required: true,
    },
    withdrawalAmount: {
        type: Number,
    },
    transactionId: {
        type: String,
    },
    payDate: {
        type: String
    },
    payTime: {
        type: String
    },
    payAmount: {
        type: String
    },
    is_active: {
        type: Boolean,
        default: true,
        index: true
    },
    status: {
        type: String
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

withdrawalSchema.index({
    userId: 1,
    upiNumber: 1,
    withdrawalAmount: 1,
    is_active: 1,
})


const Withdrawal = mongoose.model('withdrawal', withdrawalSchema)

Withdrawal.createIndexes()
Withdrawal.ensureIndexes()

module.exports = Withdrawal
