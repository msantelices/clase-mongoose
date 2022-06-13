const mongoose = require('mongoose')
const express = require('express')
const app = express()
const usersRouter = require('./routers/users.js')
const loginRouter = require('./routers/login.js')
require('dotenv').config()

const URL = process.env.DB_URL
mongoose
    .connect(URL)
    .then(()=> {
        console.log('DB connected!')
    })
    .catch((error)=> {
        console.log(error)
    })


app.use(express.json())
app.use('/', loginRouter)
app.use('/users', usersRouter)


const PORT = process.env.PORT || 8000
app.listen(PORT, ()=> { console.log(`Server running on port ${PORT}`) })