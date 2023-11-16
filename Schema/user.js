const mongoose = require('mongoose');
const { Schema } = mongoose

const userSchema = new Schema({
    username: { type: String , required : true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
}, {timestamps : true});

const userModel = mongoose.model('users', userSchema);

module.exports = userModel

