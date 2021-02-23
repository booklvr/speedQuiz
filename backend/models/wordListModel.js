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
  },
  {
    timestamps: true,
  }
)

const WordList = mongoose.model('WordList', wordListSchema)

export default WordList
