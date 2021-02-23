import mongoose from 'mongoose'

const wordListSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    wordList: [],
  },
  {
    timestamps: true,
  }
)

const WordList = mongoose.model('WordList', wordListSchema)

export default WordList
