const Users = require('../models/users.js')
const bcrypt = require('bcryptjs')

const SALT = bcrypt.genSaltSync(10)


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


const registerUser = (req, res)=> {
    const data = {
        email: req.body.email,
        username: req.body.user,
        password: bcrypt.hashSync(req.body.password, SALT),
        admin: req.body.admin
    }

    const user = new Users(data)
    user
        .save()
        .then((result)=> {
            res.json({ success: true, msg: 'Documento creado', result })
        })
        .catch((error)=> {
            res.json({ success: false, msg: 'Error creando documento', error })
        })
}


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