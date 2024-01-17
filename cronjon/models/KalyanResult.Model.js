const mongoose = require('mongoose')

const Schema = mongoose.Schema

const kalyanResultSchema = new Schema({
    adminId: {
        type: String,
        required: true,
        trim: true
    },
    eventId: {
        type: String,
        required: true,
        trim: true
    },
    eventTime: {
        type: String,
        required: true,
        trim: true
    },
    result: {
        type: Object,
    },
    slot: {
        type: Object,
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

kalyanResultSchema.index({
    eventId: 1,
    adminId: 1,
    slot: 1,
    is_active: 1,
})


const KalyanResult = mongoose.model('kalyanresult', kalyanResultSchema)

KalyanResult.createIndexes()
KalyanResult.ensureIndexes()

module.exports = KalyanResult
