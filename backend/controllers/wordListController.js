import asyncHandler from 'express-async-handler'
import WordList from '../models/wordListModel.js'
// @desc    Save a new Word List
// @route   Post  /api/wordList
// @access  Private
export const saveWordList = asyncHandler(async (req, res) => {
  const { wordList, name } = req.body

  const nameExists = await WordList.findOne({ name })

  if (nameExists) {
    res.status(400)
    throw new Error('That name has already been used')
  } else {
    const savedWordList = await WordList.create({
      user: req.user._id,
      name,
      wordList,
    })

    if (savedWordList) {
      res.status(201).json({
        wordList,
      })
    } else {
      res.status(400)
      throw new Error('Invalid user data')
    }
  }
})

export const getAllWordLists = asyncHandler(async (req, res) => {
  const wordLists = await WordList.find({ user: req.user._id })

  if (wordLists) {
    res.status(200).json(wordLists)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

export const deleteWordList = asyncHandler(async (req, res) => {
  console.log('made it to the delete word list controller')
  const wordList = await WordList.findById(req.params.id)

  console.log('wordLists', wordList)

  if (wordList) {
    await wordList.remove()
    res.json({ message: 'WordList removed' })
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})
