// Creamos un router para las rutas relacionadas al login
const express = require('express')
const router = express.Router()

// Importamos los controladores que le daran lógica a cada ruta
const { login } = require('../controllers/login.js')

// Registramos las rutas
// POST
router.post('/login', (req, res)=> { login(req, res) })
 
module.exports = router