const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    birthDay: {
        type: Date,
    }
})

const UserModel = mongoose.model('User', UserSchema);

module.exports = { UserModel };