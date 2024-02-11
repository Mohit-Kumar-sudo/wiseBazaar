const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema

const bidSchema = new Schema({
    userId: {
        type: String,
        required: true,
        trim: true
    },
    eventId: {
        type: String,
        required: true,
        trim: true
    },
    bidType: {
        type: String,
    },
    betType: {
        type: String,
        required: true
    },
    userInput: {
        type: Object,
    },
    userInputType: {
        type: String,
        required: true
    },
    userInputCount: {
        type: Number,
    },
    bidAmount: {
        type: String,
    },
    bidStatus: {
        type: String,
        default: "pending"
    },
    winingAmount: {
        type: Number,
        default: 0
    },
    slot: {
        type: Object,
    },
    transactionId: {
        type: String
    },
    transactionStatus: {
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

bidSchema.index({
    title: 1,
    is_active: 1,
})


const Bid = mongoose.model('bid', bidSchema)

Bid.createIndexes()
Bid.ensureIndexes()

module.exports = Bid
