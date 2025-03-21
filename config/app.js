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

const userRoutes = require('../src/routes/userRoutes')
app.use(userRoutes)

const taskRoutes = require('../src/routes/taskRoutes')
app.use(taskRoutes)

// Importação para o banco de dados
require('./database');
app.listen(8000)