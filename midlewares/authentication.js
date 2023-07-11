const fs = require('fs');
const path = require('path');
const express = require('express')
const app = express()
app.use(express.json())

const readFile = require ('../utils/readFile.js')
const userDataFilePath = path.join(__dirname, '../data/user.json');
const jwt = require('jsonwebtoken')


const authentication =  (req, res, next) => {
    const bearerToken = req.headers.authorization
    if (!bearerToken){
        return res.status(401).json({message: "Ban chua dang nhap"})
    }

    const token = bearerToken.split(" ")[1]
    const verify_token = jwt.verify(token,process.env.SECRET_KEY)
    if(!verify_token) {
        res.status(401).json({message: "Ban chua dang nhap"})
    }

    const userId = verify_token.userId

    const result = readFile (userDataFilePath)
    const checkUser = result.find(item => item.userId == userId)

    if (checkUser) {
        next()
    }
    return res.status(401).json({ message: "ban chua dang nhap"})
}

module.exports = authentication