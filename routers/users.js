const express = require('express')
const { expressjwt: jwt } = require("express-jwt")
const router = express.Router()
require('dotenv').config()

const { 
    getUserList, 
    getSpecificUser, 
    registerUser,
    updateUser, 
    deleteUser
} = require('../controllers/users.js')

const SECRET = process.env.SECRET
router.use(
    jwt({
        secret: SECRET,
        algorithms: ["HS256"],
    }).unless({ path: ["/register"] })
)

// GET
router.get('/list', (req, res)=> { getUserList(req, res) })
router.get('/:user', (req, res)=> { getSpecificUser(req, res) })

// POST
router.post('/register', (req, res)=> { registerUser(req, res) })

// PUT
router.put('/update/:user', (req, res)=> { updateUser(req, res) })

// DELETE
router.delete('/delete/:user', (req, res)=> { deleteUser(req, res) })


// ERRORS
router.use((err, req, res, next)=> {
    if (err.name === "UnauthorizedError") {
        res.json({ success: false, msg: 'Unauthorized' })
    } else {
        next(err);
    }
})


module.exports = router