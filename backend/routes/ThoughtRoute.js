const express = require('express')
const router = express.Router()

const ThoughtController = require('../controller/ThoughtController')

router.patch('/edit/:id', ThoughtController.update)
router.get('/:id', ThoughtController.getUpdate)
router.delete('/delete/:id', ThoughtController.delete)
router.post('/register', ThoughtController.register)
router.get('/search/:key', ThoughtController.search)
router.get('/', ThoughtController.getAll)

module.exports = router
