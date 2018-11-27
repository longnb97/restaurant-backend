const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const TableModel = new Schema({
    url: { type: String, required: true },
    chairNumber:{ type: String, required: true },
    status: { type: String, default:'Avaiable' },
    tableNumber: { type: String, required: true, unique: true },
    owner:{ type: String, default:''}
}, {
        timestamps: true
    })

module.exports = mongoose.model('Table', TableModel)