import asyncHandler from 'express-async-handler'
import WordList from '../models/wordListModel.js'
// @desc    Save a new Word List
// @route   Post  /api/wordList
// @access  Private
export const saveWordList = asyncHandler(async (req, res) => {
  console.log('lets save this mother fucking word list yeah?')
  const { wordList, name } = req.body

  console.log('wordList', wordList)
  console.log('name', name)

  const nameExists = await WordList.findOne({ name })

  if (nameExists) {
    res.status(400)
    throw new Error('That name has already been used')
  } else {
    console.log('made it to the else :)')
    const savedWordList = await WordList.create({
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
