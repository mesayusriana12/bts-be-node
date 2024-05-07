require('dotenv').config({ path: require('find-config')('.env') })
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const db = require('../models')
const User = db.users

exports.register = async (req, res) => {
  const { email, username, password } = req.body

  // Validate All Required Fields
  if (!email || !username || !password) {
    return res.status(400).json({
      status: 400,
      message: 'Please insert all required fields.',
    })
  }

  // Validate Username must be unique
  const isUniqueUsername = await User.findOne({ where: { username: username } })
  if (isUniqueUsername) {
    return res.status(400).json({
      status: 400,
      message: 'Username already registered.',
    })
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await User.create(
    {
      email : email,
      username : username,
      password : hashedPassword
    }
  ).then((user) => {
    res.status(201).json({
      status: 201,
      message: 'Registration success, please login.',
    })
  }).catch((err) => {
    res.status(500).json({
      status: 500,
      message: 'Internal Server Error.',
      error: err.errors[0].message
    });
  });
}

exports.login = async (req, res) => {
  const { username, password } = req.body

  // Validate All Required Fields
  if (!username || !password) {
    return res.status(400).json({
      status: 400,
      message: 'Please insert all required fields.',
    })
  }

  // Find Username
  const user = await User.findOne({ where: { username: username } })
  
  try {
    if (!user) {
      return res.status(404).json({
        status: 404,
        message: 'Username not found.',
      })
    }
    
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: 'Internal Server Error.',
      error: error
    });
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password)

  if (!isPasswordMatch) {
    return res.status(401).json({
      status: 401,
      message: 'Password is incorrect.',
    })
  }

  res.status(200).json({
    status: 200,
    message: 'Login success.',
    token: jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }),
  })
}
