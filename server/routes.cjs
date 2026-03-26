const express = require('express')
const EntryController = require('./controllers/EntryController.cjs')

const router = express.Router()

//web routes here
router.get('/entries', EntryController.index)
router.post('/entries', EntryController.store)
router.patch('/entries/:entry', EntryController.update)
router.delete('/entries/:entry', EntryController.destroy)

module.exports = router