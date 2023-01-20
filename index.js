// Importamos las dependencias necesarias
const mongoose = require('mongoose')
const express = require('express')
require('dotenv').config()

// Iniciamos express e importamos los archivos de rutas
const app = express()
const usersRouter = require('./routers/users.js')
const loginRouter = require('./routers/login.js')

// Iniciamos la conexión con la base de datos obteniendo la URL desde las variables de entorno
const URL = process.env.DB_URL
mongoose
    .connect(URL)
    .then(()=> {
        console.log('DB connected!')
    })
    .catch((error)=> {
        console.log(error)
    })

// Agregamos los middlewares necesarios, en este caso, el que permite procesar peticiones
// en formato JSON y las rutas
app.use(express.json())
app.use('/', loginRouter)
app.use('/users', usersRouter)

// Iniciamos el servidor. Tratamos de tomar una variable de entorno para el puerto, si no
// utilizamos uno por defecto. Esta lógica nos ayudará al hacer el deploy
const PORT = process.env.PORT || 8000
app.listen(PORT, ()=> { console.log(`Server running on port ${PORT}`) })