import asyncHandler from 'express-async-handler'
import mongoose from 'mongoose'
import WordList from '../models/wordListModel.js'
// @desc    Save a new Word List
// @route   Post  /api/wordList
// @access  Private
export const saveWordList = asyncHandler(async (req, res) => {
  let newObject = req.body
  let { id, name } = newObject

  // delete the id from the object if it exists
  delete newObject.id

  // if id is undefined create new id for upsert
  if (!id) {
    id = mongoose.Types.ObjectId()
  }

  // only allow unique names
  const nameExists = await WordList.findOne({ name })

  if (nameExists) {
    res.status(400)
    throw new Error('That name has already been used')
  } else {
    newObject.user = req.user._id

    let doc = await WordList.findByIdAndUpdate(id, newObject, {
      new: true,
      upsert: true,
    })

    if (doc) {
      res.status(201).json({
        wordList: doc,
      })
    } else {
      res.status(400)
      throw new Error('Invalid user data')
    }
  }
})

export const getSavedListById = asyncHandler(async (req, res) => {
  const wordList = await WordList.findOne({
    user: req.user._id,
    _id: req.params.id,
  })

  if (wordList) {
    res.status(200).json(wordList)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

export const getAllWordLists = asyncHandler(async (req, res) => {
  const wordLists = await WordList.find({ user: req.user._id })

  if (wordLists) {
    res.status(200).json(wordLists)
  } else {
    res.status(404)
    throw new Error('WordLists not found')
  }
})

export const deleteWordList = asyncHandler(async (req, res) => {
  const wordList = await WordList.findById(req.params.id)

  if (wordList) {
    await wordList.remove()
    res.json({ message: 'WordList removed' })
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})
