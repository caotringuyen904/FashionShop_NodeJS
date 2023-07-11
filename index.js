const express = require('express')
const app = express()
const morgan = require('morgan')
const router = require('./router/index')
const path = require('path')
const cors = require('cors')
const port = 8010
const dotenv = require("dotenv")


dotenv.config()
// app.use(express.urlencoded())
app.use(morgan('combined'))
app.use(express.json())
app.use(cors({
    origin: "*"
}))


app.use(router);
app.use(express.static(path.join(__dirname, './data')))

app.listen(port, () => {
    console.log("Server is listening on http://localhost:" + port)
})