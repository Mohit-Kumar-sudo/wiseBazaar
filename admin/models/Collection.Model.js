const mongoose = require('mongoose')

const CollectionSchema = new mongoose.Schema({
    collection_name: {
        type: String
    },
    field_name: {
        type: String,
    },
    field_type: {
        type: String,
    },
    mandatory: {
        type: Boolean,
    },
    values: {
        type: String,
    },
    created_at: {
        type: Date
    },
    created_by: {
        type: mongoose.Types.ObjectId
    },
    updated_at: {
        type: Date
    },
    deleted_at: {
        type: Date
    },
    restored_at: {
        type: Date
    }
})

const CollectionFile = mongoose.model('collectionfile', CollectionSchema)

module.exports = CollectionFile