const mongoose = require('mongoose')

const Schema = mongoose.Schema

const kalyanEventSchema = new Schema({
    eventTime: {
        type: String,
        required: true,
    },
    notification: {
        type: Array,
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
    updated_by: {
        type: String,
        default: 'self'
    },
})

kalyanEventSchema.index({
    title: 1,
    is_active: 1,
})


const kalyanEvent = mongoose.model('kalyanEvent', kalyanEventSchema)

kalyanEvent.createIndexes()
kalyanEvent.ensureIndexes()

module.exports = kalyanEvent
