const mongoose = require('mongoose')

const Schema = mongoose.Schema

const notificationSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    desc: {
        type: String,
        required: true,
        trim: true
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

notificationSchema.index({
    title: 1,
    is_active: 1,
})


const Notification = mongoose.model('notification', notificationSchema)

Notification.createIndexes()
Notification.ensureIndexes()

module.exports = Notification
