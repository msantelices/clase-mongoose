// Importamos mongoose y extraermos el objeto Schema
const mongoose = require('mongoose')
const { Schema } = mongoose

// Creamos un nuevo esquema con los campos que tendran nuestros documentos
// Se definen los campos que serán requeridos. También se definen los
// campos que serán únicos dentro de la base de datos.
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        required: true
    }
})
// Agregamos indices para agilizar las busquedas
userSchema.index({ email: 1, username: 1 })

// Creamos un nuevo modelo de datos utilizando el esquema creado previamente
const Users = mongoose.model('users', userSchema)


module.exports = Users