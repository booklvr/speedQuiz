import asyncHandler from 'express-async-handler'
import WordList from '../models/wordListModel.js'
// @desc    Save a new Word List
// @route   Post  /api/wordList
// @access  Private
export const saveWordList = asyncHandler(async (req, res) => {
  const id = req.params.id
  const { wordList, name, categoryList } = req.body

  const nameExists = await WordList.findOne({ name })

  if (nameExists && id) {
    res.status(400)
    throw new Error('That name has already been used')
  } else {
    const newWordList = {
      user: req.user._id,
      name,
      wordList,
      categoryList,
    }

    let doc = await WordList.findOneAndUpdate({ _id: id }, newWordList, {
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
