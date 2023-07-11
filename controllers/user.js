const fs = require('fs');
const path = require('path');
const express = require('express')
const app = express()
app.use(express.json())

const readFile = require('../utils/readFile');
const { sign } = require('crypto');
const jwt = require('jsonwebtoken')
const userDataFilePath = path.join(__dirname, '../data/user.json');


const loginUser = (req,res) => {
  const userId = req.query.userId
  const result = readFile(userDataFilePath)
  const checkUser = result.find(item => item.userId == userId)

  if (!checkUser) {
    res.status(401).json({message : "User not exits !!!"})
  }

  const token = jwt.sign({userId: checkUser.userId}, process.env.SECRET_KEY, {expiresIn: "1d"})
  
  return res.status(200).json({token, message: "Dang nhap thanh cong"})

}

const getUser = (req, res) => {
  console.log("ban da vao getUser!!!!");
  const result = readFile(userDataFilePath);
  return res.status(200).json({ result });
};

const createUser = (req, res) => {
  const userId = req.body.userId;
  const username = req.body.username;

  const result = readFile(userDataFilePath);

  const newResult = [...result, { userId, username }];
  fs.writeFileSync(userDataFilePath, JSON.stringify(newResult));

  return res.status(200).json({
    message: 'create user success',
  });
};

const deleteUser = (req, res) => {
  const cancelUser = Number(req.params.id)
  const result = readFile(userDataFilePath)
  let newResult;

  try {
    newResult = JSON.parse(result);
  } catch (error) {
    newResult = [];
  }

  const filteredResult = newResult.filter(item => item.userId != cancelUser);

  console.log(filteredResult);

  fs.writeFileSync(userDataFilePath, JSON.stringify(filteredResult))


  return res.status(200).json({
    message: 'User deleted successfully'
  });
};

module.exports = {
  createUser,
  getUser,
  deleteUser,
  loginUser
};

