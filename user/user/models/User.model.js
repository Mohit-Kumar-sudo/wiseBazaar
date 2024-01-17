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
    withdrawalRequest: {
        type: Array
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
    spin_enable: {
        type: Boolean,
        default: false
    },
    spin: {
        type: String,
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
        /* 
        Here first checking if the document is new by using a helper of mongoose .isNew, therefore, this.isNew is true if document is new else false, and we only want to hash the password if its a new document, else  it will again hash the password if you save the document again by making some changes in other fields incase your document contains other fields.
        */
        if (this.isNew) {
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(this.password, salt)
            this.password = hashedPassword
        }
        if (this.isModified('spin')) {
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(this.spin, salt)
            this.spin = hashedPassword
        }
        next()
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

UserSchema.methods.isValidSpin = async function (spin) {
    try {
        return await bcrypt.compare(spin, this.spin)
    } catch (error) {
        throw error
    }
}

const User = mongoose.model('user', UserSchema)

User.createIndexes()
User.ensureIndexes()

module.exports = User