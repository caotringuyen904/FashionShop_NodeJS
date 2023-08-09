const express = require('express')
const app = express()
const morgan = require('morgan')
const router = require('./router/index')
const path = require('path')
const cors = require('cors')
const dotenv = require("dotenv")
const {connectionMongoDB} = require("./database/index")

dotenv.config()
// app.use(express.urlencoded())
app.use(morgan('combined'))
app.use(express.json())
app.use(cors({
    origin: "*"
}))

connectionMongoDB();

app.use(router);
app.use(express.static(path.join(__dirname, './data')))

app.listen(process.env.PORT || 4000, () => {
    console.log("Server is listening on http://localhost:" + process.env.PORT || 4000)
})