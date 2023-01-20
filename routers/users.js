// Creamos un router para las rutas relacionadas a la gestión de usuarios
// En este caso tambien necesitaremos JWT y variables de entorno
const express = require('express')
const { expressjwt: jwt } = require("express-jwt")
const router = express.Router()
require('dotenv').config()

// Importamos los controladores que le daran logica a cada ruta
const { 
    getUserList, 
    getSpecificUser, 
    registerUser,
    updateUser, 
    deleteUser
} = require('../controllers/users.js')

// Registramos el middleware que permite validar los auth tokens
// en cada ruta del router de usuarios, con excepcion de la ruta de registro
const SECRET = process.env.SECRET
router.use(
    jwt({
        secret: SECRET,
        algorithms: ["HS256"],
    }).unless({ path: ["/register"] })
)

// Registramos las rutas
// GET
router.get('/list', (req, res)=> { getUserList(req, res) })
router.get('/:user', (req, res)=> { getSpecificUser(req, res) })

// POST
router.post('/register', (req, res)=> { registerUser(req, res) })

// PUT
router.put('/update/:user', (req, res)=> { updateUser(req, res) })

// DELETE
router.delete('/delete/:user', (req, res)=> { deleteUser(req, res) })

// Manejador de errores de permisos
// ERRORS
router.use((err, req, res, next)=> {
    if (err.name === "UnauthorizedError") {
        res.status(401).json({ success: false, msg: 'Unauthorized' })
    } else {
        next(err);
    }
})


module.exports = router