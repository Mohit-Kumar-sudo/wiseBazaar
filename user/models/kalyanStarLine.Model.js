const mongoose = require('mongoose')

const Schema = mongoose.Schema

const kalyanStarlineSchema = new Schema({
    userId: {
        type: String,
        required: true,
        trim: true
    },
    eventTitle: {
        type: String,
        required: true,
        default: "Kalyan Starline"
    },
    eventTime: {
        type: String,
        required: true,
    },
    eventId: {
        type: String,
        required: true,
    },
    betType: {
        type: String,
        required: true
    },
    userInput: {
        type: Object,
    },
    bidAmount: {
        type: String,
    },
    slot: {
        type: Object,
    },
    biStatus: {
        type: String,
        default: "pending"
    },
    winingAmount: {
        type: Number,
        default: 0
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

kalyanStarlineSchema.index({
    eventName: 1,
    betType: 1,
    userId: 1,
    is_active: 1,
})


const kalyanStarline = mongoose.model('kalyanStarline', kalyanStarlineSchema)

kalyanStarline.createIndexes()
kalyanStarline.ensureIndexes()

module.exports = kalyanStarline
