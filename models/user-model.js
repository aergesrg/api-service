const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    role: {type: String, default: "user"},
})

module.exports = model('User', UserSchema);