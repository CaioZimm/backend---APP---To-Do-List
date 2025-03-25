const taskRepository = require('../repositories/taskRepository')

exports.createTask = async (title, date, idUser, idCategory = null) => {
    const newTask = {
        title, 
        date, 
        idUser,
        idCategory
    }

    return await taskRepository.create(newTask);
};

exports.getAllTasks = async (idUser) => {
    return await taskRepository.index(idUser);
};

exports.showTask = async (id, idUser) => {
    return await taskRepository.showTask(id, idUser);
};

exports.putTask = async (id, title, date, idCategory) => {
    const updatedTask = {};

    if (title) updatedTask.title = title
    if (date) updatedTask.date = date
    if (idCategory) updatedTask.idCategory = idCategory

    return await taskRepository.updateTask(id, updatedTask);
}

exports.deleteTask = async (id) => {
    return await taskRepository.deleteTask(id);
}