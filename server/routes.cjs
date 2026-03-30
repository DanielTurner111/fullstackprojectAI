const express = require('express')
const CategoryController = require('./controllers/CategoryController.cjs')

const router = express.Router()

//web routes here
router.get('/categories', CategoryController.index)
router.post('/categories', CategoryController.store)
router.patch('/categories/:category', CategoryController.update)
router.delete('/categories/:category', CategoryController.destroy)

module.exports = router