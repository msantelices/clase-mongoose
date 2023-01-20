// Importamos el modelo de datos y las dependencias necesarias
const Users = require('../models/users.js')
const bcrypt = require('bcryptjs')

// Generamos las rondas de SALT que utilizaremos para encriptar la contraseña
const SALT = bcrypt.genSaltSync(10)


// Funcion para obtener el listado de todos los usuarios
const getUserList = (req, res)=> {
    Users
        .find()
        .then((result)=> {
            res.json({ success: true, result })
        })
        .catch((error)=> {
            res.json({ success: false, error })
        })
}

// Funcion para buscar un usuario en específico
const getSpecificUser = (req, res)=> {
    Users
        .findOne({ username: req.params.user })
        .then((result)=> {
            res.json({ sucess: true, result })
        })
        .catch((error)=> {
            res.json({ success: false, error })
        })
}

// Funcion para registrar un nuevo usuario
const registerUser = (req, res)=> {
    // Generamos el objeto que contiene la data a guardar. En el caso de la contraseña
    // esta se almacena encriptada
    const data = {
        email: req.body.email,
        username: req.body.user,
        password: bcrypt.hashSync(req.body.password, SALT),
        admin: req.body.admin
    }

    // Creamos una nueva instancia de nuestro modelo de datos para Usuarios con la data
    // que acabamos de recopilar y la guardamos en la base de datos
    const user = new Users(data)
    user
        .save()
        .then((result)=> {
            // Si todo esta bien, se envia una respuesta exitosa
            res.json({ success: true, msg: 'Documento creado', result })
        })
        .catch((error)=> {
            // De lo contrario, se envia una respuesta informando el error
            res.status(500).json({ success: false, msg: 'Error creando documento', error })
        })
}

// Funcion para actualizar un usuario
const updateUser = (req, res)=> {
    Users
        .findOneAndUpdate(
            { username: req.params.user },
            { $set: req.body }
        )
        .then((result)=> {
            res.json({ success: true, result })
        })
        .catch((error)=> {
            res.json({ success: false, error })
        })
}

// Funcion para eliminar un usuario
const deleteUser = (req, res)=> {
    Users
        .deleteOne({ username: req.params.user })
        .then((result)=> {
            res.json({ success: true, result })
        })
        .catch((error)=> {
            res.json({ success: false, error })
        })
}

module.exports = { getUserList, getSpecificUser, registerUser, updateUser, deleteUser }