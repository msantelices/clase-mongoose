// Importamos el modelo de datos para los usuarios y las dependencias necesarias
const Users = require('../models/users.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const SECRET = process.env.SECRET

// Logica para la función login
const login = (req, res)=> {
    // Extraemos desde el body de la peticion el usuario y contraseña
    const user = req.body.username
    const pass = req.body.password

    // Si falta alguno de los campos, enviamos una respuesta informando que son campos requeridos
    if(!user) {
        return res.status(400).json({ success: false, msg: 'Usuario requerido' })
    }

    if(!pass) {
        return res.status(400).json({ success: false, msg: 'Contraseña requerida' })
    }

    // Si la data requerida existe, buscamos al usuario en base al campo username
    Users
        .findOne({ username: user })
        .then((result)=> {
            // Si el usuario existe, comparamos las contraseñas. Como las constraseñas deben
            // guardarse encriptadas, utilizamos la función de comparación de bcrypt
            const validPass = bcrypt.compareSync(pass, result.password)

            // Si las contraseñas coinciden, generamos un JWT y lo enviamos dentro de la respuesta
            // De lo contrario, enviamos una respuesta informando que la contraseña es incorrecta
            if(validPass) {
                const token = jwt.sign({ username: result.user, email: result.email }, SECRET, { expiresIn: '3h' })
                res.json({ success: true, token})
            } else {
                res.json({ success: false, msg: 'Contraseña incorrecta' })
            }
        })
        .catch((error)=> {
            // Si el usuario no existe, enviamos una respuesta informando la situacion
            res.json({ success: false, msg: 'Usuario no encontrado', error })
        })
}


module.exports = { login }