import express from 'express'
import {
  saveWordList,
  getAllWordLists,
  deleteWordList,
  getSavedListById,
} from '../controllers/wordListController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router
  .route('/:id')
  .delete(protect, deleteWordList)
  .get(protect, getSavedListById)

router.route('/').post(protect, saveWordList).get(protect, getAllWordLists)

export default router
