const mongoose = require('mongoose')
const express = require('express')
const User = require('../src/models/User')
const Task = require('../src/models/Task')
const Category = require('../src/models/Category')
const bcrypt = require('bcrypt')
const { faker } = require('@faker-js/faker')

const app = express()
require('./database')
app.listen(8000)

const seedUsers = async () => {
    const users = [];

    const hashedPassword = await bcrypt.hash("password", 12)

    for (var i = 0; i < 5; i++){
        users.push({
            name: faker.internet.username(),
            email: faker.internet.email(),
            password: hashedPassword,
        })
    }

    const createdUsers = await User.insertMany(users)
    console.log('Usuarios inseridos!')
    return createdUsers
}

const seedCategories = async (users) => {
    const categories = [];

    for (var i = 0; i < 7; i++){
        categories.push({
            name: faker.lorem.word(),
            color: faker.color.rgb(),
            idUser: faker.helpers.arrayElement(users)._id
        })
    }

    const createdCategories = await Category.insertMany(categories)
    console.log('Categorias inseridas!')
    return createdCategories
}

const seedTasks = async (users, categories) => {
    const tasks = [];

    for (var i = 0; i < 10; i++){
        const user = faker.helpers.arrayElement(users)
        const userCategory = categories.filter(category => category.idUser.toString() === user._id.toString())

        tasks.push({
            title: faker.lorem.words(3),
            date: faker.date.future(),
            idUser: user._id,
            idCategory: userCategory.length > 0 ? faker.helpers.arrayElement(userCategory)._id : null
        })
    }

    await Task.insertMany(tasks)
    console.log('Tarefas inseridas!')
}

const seedDB = async () => {
    await mongoose.connection.dropDatabase()

    const users = await seedUsers()
    const categories = await seedCategories(users)
    await seedTasks(users, categories)

    await mongoose.connection.close() 
    console.log('Seed realizados')

    process.exit(0)
}

seedDB();