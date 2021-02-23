import express from 'express'
import {
  saveWordList,
  getAllWordLists,
  deleteWordList,
} from '../controllers/wordListController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/:id').delete(protect, deleteWordList)

router.route('/').post(protect, saveWordList).get(protect, getAllWordLists)

export default router
