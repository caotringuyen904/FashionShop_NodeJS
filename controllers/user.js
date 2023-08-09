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
const Joi = require("joi");
const { error } = require('console');


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
  const userSchema = Joi.object({
    username: Joi.string().min(6).max(32).required().messages({
      "string.min": "Username at least 6 characters",
      "string.max": "Username most 32 characters",
      "string.empty": "Username cannot empty"
    }),
    password: Joi.string().min(6).max(32).required().messages({
      "string.min": "password at least 6 characters",
      "string.max": "password most 32 characters",
      "string.empty": "password cannot empty"
    }),
  })

  const username = req.body.username
  const userPassword = req.body.password

  try {
    const validate = userSchema.validate(req.body)
    console.log(validate);

    if (validate.error) {
      return res.status(400).json({ message: validate.error.message })
    }

    const checkUser = await UserModel.findOne({
      username: username
    })

    if (checkUser) {
      return res.status(400).json({ message: "User is exist" })
    }

    const salt = bcrypt.genSaltSync()
    const hash = bcrypt.hashSync(userPassword, salt)

    const user = new UserModel({
      username: username,
      password: hash
    })

    const result = await user.save()

    return res.status(200).json({
      message: 'create user success',
      user: result
    })

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error" })
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

