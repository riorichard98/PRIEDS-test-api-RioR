const express = require('express')
const { VisitorController } = require('../controllers/visitorController')
const router = express.Router()

router.get('/',VisitorController.findAllVisitor)
router.get('/:id',VisitorController.findVisitorById)
router.post('/',VisitorController.createVisitor)

module.exports = router