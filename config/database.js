require('dotenv').config()
const mongoose = require('mongoose')

mongoose.connect(
    `mongodb://127.0.0.1:27017/App_ToDoList?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.4.0`)
    .then(() => {
        console.log('TA DENTRO PAE!')
    })
    .catch((err) => console.log(err))

module.exports = mongoose

// DB_USER=admin
// DB_PASSWORD=password
// DATABASE_URL="mongodb://127.0.0.1:27017/reactlogin?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.9"

// mongodb://127.0.0.1:27017/App_ToDoList?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.4.0

// const dbUrl = process.env.DATABASE_URL