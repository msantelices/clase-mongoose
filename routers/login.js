const express = require('express')
const router = express.Router()
const { login } = require('../controllers/login.js')

// POST
router.post('/login', (req, res)=> { login(req, res) })
 
module.exports = router