import mongoose from 'mongoose'

const wordListSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    wordList: [],
    categoryList: [],
  },
  {
    timestamps: true,
  }
)

const WordList = mongoose.model('WordList', wordListSchema)

export default WordList
