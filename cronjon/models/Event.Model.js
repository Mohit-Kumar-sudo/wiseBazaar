const mongoose = require('mongoose')

const Schema = mongoose.Schema

const EventSchema = new Schema({
    title: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
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

EventSchema.index({
    title: 1,
    is_active: 1,
})


const Event = mongoose.model('event', EventSchema)

// Event.createIndexes()
// Event.ensureIndexes()

module.exports = Event
