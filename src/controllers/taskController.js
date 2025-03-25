const taskService = require('../services/taskService')

exports.createTask = async (req, res) => {
    const { title, date, idCategory } = req.body
    const idUser = req.user.id

    try {
        const task = await taskService.createTask(title, date, idUser, idCategory);
        return res.status(201).json({ message: 'Tarefa adicionada com sucesso!', data: task})

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message })
    }
}

exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await taskService.getAllTasks(req.user.id);

        if (tasks.length === 0){
            return res.status(200).json({ message: 'Nenhuma tarefa encontrada.'})
        }

        return res.status(200).json({ message: 'Lista de tarefas:', data: tasks })

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

exports.showTask = async (req, res) => {
    try {
        const task = await taskService.showTask(req.params.id, req.user.id);
        return res.status(200).json({ data: task })

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

exports.putTask = async (req, res) => {
    const { title, date, idCategory } = req.body;

    if (!title && !date && !idCategory){
        return res.status(400).json({ message: 'Nenhuma alteração feita.' })
    }

    try {
        const updatedTask = await taskService.putTask(req.params.id, title, date, idCategory)
        return res.status(200).json({ message: 'Tarefa atuaizada', data: updatedTask })

    } catch (error) {
        return res.status(404).json({ error: error.message })
    }
}

exports.deleteTask = async (req, res) => {
    try {
        await taskService.deleteTask(req.params.id);
        return res.status(200).json({ message: 'Tarefa deletada com sucesso' })

    } catch (error) {
        return res.status(404).json({ error: error.message })
    }
}