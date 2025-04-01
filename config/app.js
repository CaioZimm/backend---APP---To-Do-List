// Importação do framework Express e para o CORS
const express = require('express')
const cors = require('cors')

const app = express()

app.use(
    express.urlencoded({
        extended: true,
    }),
    express.json(),
    cors()
)

const authRoutes = require('../src/routes/authRoutes')
app.use(authRoutes)

const forgotPasswordRoutes = require('../src/routes/forgotPasswordRoutes')
app.use(forgotPasswordRoutes)

const userRoutes = require('../src/routes/userRoutes')
app.use(userRoutes)

const taskRoutes = require('../src/routes/taskRoutes')
app.use(taskRoutes)

const categoryRoutes = require('../src/routes/categoryRoutes')
app.use(categoryRoutes)

app.use('/uploads', express.static('uploads'))

// Importação para o banco de dados
require('./database');
app.listen(8000)