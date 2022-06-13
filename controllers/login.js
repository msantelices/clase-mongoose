const Users = require('../models/users.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const SECRET = process.env.SECRET

const login = (req, res)=> {
    const user = req.body.username
    const pass = req.body.password

    if(!user) {
        return res.json({ success: false, msg: 'Usuario requerido' })
    }

    if(!pass) {
        return res.json({ success: false, msg: 'Contraseña requerida' })
    }

    Users
        .findOne({ username: user })
        .then((result)=> {
            const validPass = bcrypt.compareSync(pass, result.password)

            if(validPass) {
                const token = jwt.sign({ username: result.user, email: result.email }, SECRET, { expiresIn: '3h' })
                res.json({ success: true, token})
            } else {
                res.json({ success: false, msg: 'Contraseña incorrecta' })
            }
        })
        .catch((error)=> {
            res.json({ success: false, msg: 'Usuario no encontrado', error })
        })
}


module.exports = { login }