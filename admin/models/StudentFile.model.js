const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TableSchema = new Schema({
    filename: { type: String, index: true},
    path: { type: String, index: true},
    student_data_file: { type: String, index: true},
    is_active: {
        type: Boolean,
        default: true,
        index: true
    },
    status: {
        type: String
    },
    created_at: {
        type: Date
    },
    created_by: {
        type: String,
        default: 'self'
    },
    updated_at: {
        type: Date
    },
    updated_by: {
        type: String,
        default: 'self'
    },
})

TableSchema.pre('save', async function (next) {
    try {
      /* 
      Here first checking if the document is new by using a helper of mongoose .isNew, therefore, this.isNew is true if document is new else false, and we only want to hash the password if its a new document, else  it will again hash the password if you save the document again by making some changes in other fields incase your document contains other fields.
      */
      if (this.isNew) {
        this.created_at = Date.now()
    } else {
        this.updated_at = Date.now()
      }
      next()
    } catch (error) {
      next(error)
    }
  })

const Table = mongoose.model('studentfile', TableSchema)
module.exports = Table