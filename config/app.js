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

// const User = require('../src/models/User')

// const newUser = new User({
//     name: 'Caio',
//     email: 'caio@gmail.com',
//     password: 'password',
//     createdAt: Date.now()
// });

// newUser.save()
//   .then(doc => console.log(doc))
//   .catch(err => console.error(err));

// Importação para o banco de dados
const database = require('./database')
app.use(database);