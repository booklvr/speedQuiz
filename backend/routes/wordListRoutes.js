import express from 'express'
import { saveWordList } from '../controllers/wordListController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').post(saveWordList)

export default router
