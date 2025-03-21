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

exports.getAllTasks = async () => {
    return await taskRepository.index();
};

exports.showTask = async (id) => {
    return await taskRepository.showTask(id);
};

exports.putTask = async (id, title, date, idCategory) => {
    return await taskRepository.updateTask(id, { title, date, idCategory });
}

exports.deleteTask = async (id) => {
    return await taskRepository.deleteTask(id);
}