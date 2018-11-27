const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
    username: { type: String, required: true, unique: true },
    hashPassword: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    avatarUrl: { type: String }

}, {
        timestamps: true
    })


module.exports = mongoose.model("Account", AccountSchema)