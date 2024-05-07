const express = require('express')
const router = express.Router()

const authMiddleware = require('../middlewares/authMiddleware')
const checklistItemController = require('../controllers/checklistItem')

router.get('/:checklistId/item', authMiddleware, checklistItemController.getAll)
router.post('/:checklistId/item', authMiddleware, checklistItemController.store)
router.get('/:checklistId/item/:checklistItemId', authMiddleware, checklistItemController.getOne)
router.put('/:checklistId/item/:checklistItemId', authMiddleware, checklistItemController.markAsDone)
router.delete('/:checklistId/item/:checklistItemId', authMiddleware, checklistItemController.delete)
router.put('/:checklistId/item/rename/:checklistItemId', authMiddleware, checklistItemController.rename)

module.exports = router
