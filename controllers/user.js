const fs = require('fs');
const path = require('path');
const express = require('express')
const app = express()
app.use(express.json())

const readFile = require('../utils/readFile');
const { sign } = require('crypto');
const jwt = require('jsonwebtoken')
const userDataFilePath = path.join(__dirname, '../data/user.json');
const bcrypt = require('bcryptjs')
const { UserModel } = require('../models/Users')


const loginUser = (req, res) => {
  const username = req.body.username
  const userPassword = req.body.password

  const result = readFile(userDataFilePath)

  const checkUser = result.find(item => item.username == username)
  if (!checkUser) {
    res.status(401).json({ message: "User not exits !!!" })
  }

  const checkPassword = bcrypt.compareSync(userPassword.toString(), checkUser.password)
  if (!checkPassword) {
    res.status(401).json({ message: "Password is not incorrect !!!" })
  }


  const token = jwt.sign({ userId: checkUser.userId }, process.env.SECRET_KEY, { expiresIn: "1d" })

  const { password, ...returnUser } = checkUser

  return res.status(200).json({ token, user: returnUser })

}

const getUser = (req, res) => {
  console.log("ban da vao getUser!!!!");
  const result = readFile(userDataFilePath);
  return res.status(200).json({ result });
};


const createUser = async (req, res) => {
  const username = req.body.username
  const password = req.body.password

  const salt = bcrypt.genSaltSync()
  const hash = bcrypt.hashSync(password, salt)

  try {
    const user = await UserModel.create({
      username: username,
      password: hash
    })

    const {password, ...returnUser} = user

    return res.status(200).json({
      message: 'create user success',
      user: returnUser
    })

  } catch (error) {
    console.log(error);
    return res.status(500).json({message : "error"})
  }




};

const deleteUser = (req, res) => {
  const cancelUser = req.params.id
  const result = readFile(userDataFilePath)
  let newResult = result


  const filteredResult = newResult.filter(item => item.username != cancelUser);

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

