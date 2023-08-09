const mongoose = require('mongoose')

const connectionMongoDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://21522918:123456789a@cluster0.n9mrrzy.mongodb.net/user`)
        console.log("Connect mongoDB to successfully");
    }
    catch (error){
        console.log(error)
    }
}

module.exports = {
    connectionMongoDB
}