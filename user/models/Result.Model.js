const mongoose = require('mongoose')

const Schema = mongoose.Schema

const resultSchema = new Schema({
    event_name: {
        type: String,
        required: true,
        trim: true
    },
    patti: String,
    digit: String,
    open_patti: String,
    open_digit: String,
    data_set: String,
    event_slot: {
        type: String,
        trim: true
    },
    event_date: {
        type: Date
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

resultSchema.index({
    event_name: 1,
    openPatti: 1,
    openDigit: 1,
    closePatti: 1,
    closeDigit: 1,
    event_slot: 1,
    is_active: 1,
})


const Result = mongoose.model('result', resultSchema)

module.exports = Result
