const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema

const UserSchema = new Schema({
    first_name: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    last_name: {
        type: String,
        required: true,
        lowercase: true,
        trim: true

    },
    username: {
        type: String,
        required: true,
        lowercase: true,
        trim: true

    },
    mobile: {
        type: String,
        required: true,
        unique: true
    },
    wallet: {
        type: Number,
        default: 10
    },
    password: {
        type: String,
        required: true
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

UserSchema.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(this.password, salt)
        this.password = hashedPassword
    } catch (error) {
        next(error)
    }
})

UserSchema.post('save', async function (next) {
    try {
        // console.log('after save user');
    } catch (error) {
        next(error)
    }
})

UserSchema.methods.isValidPassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password)
    } catch (error) {
        throw (error)
    }
}

UserSchema.index({
    mobile: 1,
    username: 1,
    password: 1
})


const User = mongoose.model('user', UserSchema)

User.createIndexes()
User.ensureIndexes()

module.exports = User
