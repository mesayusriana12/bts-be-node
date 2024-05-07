const express = require('express')
const router = express.Router()

const authMiddleware = require('../middlewares/authMiddleware')
const checklistController = require('../controllers/checklist')

router.get('/checklist', authMiddleware, checklistController.all)
router.post('/checklist', authMiddleware, checklistController.store)
router.delete('/checklist/:checklistId', authMiddleware, checklistController.delete)

module.exports = router
