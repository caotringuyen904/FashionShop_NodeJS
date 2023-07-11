const fs = require('fs');
const path = require('path');
const express = require('express')
const app = express()
app.use(express.json())


const readFile = require('../utils/readFile');

const userDataFilePath = path.join(__dirname, '../data/user.json');

const getCustomer = (req, res) => {
  const result = readFile(userDataFilePath);
  return res.status(200).json({ result });
};



module.exports = {
    getCustomer
}