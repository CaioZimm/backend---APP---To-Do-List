const mongoose = require('mongoose')
const Task = require('../models/Task')

exports.create = async (task) => {
    try {
        const newTask = new Task({
            title: task.title,
            date: task.date,
            idUser: new mongoose.Types.ObjectId(task.idUser),
            idCategory: task.idCategory ? new mongoose.Types.ObjectId(task.idCategory) : null
        })

        await newTask.save();
        return newTask;

    } catch (error) {
        throw new Error('Erro ao criar uma nova tarefa: ' + error.message);
    }
}

exports.index = async (idUser) => {
    return await Task.find({ idUser: idUser }).populate('idCategory', 'name color');
}

exports.showTask = async (id, idUser) => {
    try {
        const task = await Task.findOne({ _id: id, idUser: idUser}).populate('idCategory', 'name color')

        if(!task){
            throw new Error('Tarefa não encontrada.')
        }

        return task;

    } catch (error) {
        throw new Error(error.message);
    }
}

exports.updateTask = async (id, updatedTask) => {
    try {
        const task = await Task.findByIdAndUpdate(id, updatedTask, { new: true, runValidators: true })

        if(!task){
            throw new Error('Tarefa não encontrada')
        }

        return task;

    } catch (error) {
        throw new Error('Erro ao atualizar tarefa ' + error.message);
    }
}

exports.deleteTask = async (id) => {
    try {
        const task = await Task.findById(id)

        if(!task){
            throw new Error('Tarefa não encontrada');
        }

        await task.deleteOne()
        return;

    } catch (error) {
        throw new Error('Erro ao deletar tarefa: ' + error.message);
    }
} 