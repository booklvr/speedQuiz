import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'

// @desc    Auth user & get token
// @route   Post  /api/users/login
// @access  Public
export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })


  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})
// @desc    Register a new User
// @route   Post  /api/users
// @access  Public
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  } else {
    const user = await User.create({
      name,
      email,
      password,
    })

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      })
    } else {
      res.status(400)
      throw new Error('Invalid user data')
    }
  }
})

// @desc    Get User Profile
// @route   GET  /api/users/profile
// @access  Private
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Update User Profile
// @route   Put  /api/users/profile
// @access  Private
export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      token: generateToken(updatedUser._id),
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})
