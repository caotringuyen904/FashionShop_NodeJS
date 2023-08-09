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

module.exports =  mongoose.model("users", UserSchema)
