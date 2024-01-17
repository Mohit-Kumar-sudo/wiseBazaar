const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema

const UserWalletSchema = new Schema({
    userId: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    amount: {
        type: String,
    },
    slot: {
        type: Object
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

UserWalletSchema.index({
    userId: 1,
    amount: 1,
})


const UserWallet = mongoose.model('userwallet', UserWalletSchema)

UserWallet.createIndexes()
UserWallet.ensureIndexes()

module.exports = UserWallet
