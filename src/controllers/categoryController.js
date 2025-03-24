const categoryService = require('../services/categoryService')

exports.createCategory = async (req, res) => {
    const { name, color } = req.body
    const idUser = req.user.id

    try {
        const category = await categoryService.createCategory(name, color, idUser);
        return res.status(201).json({ message: 'Categoria criada com sucesso!', data: category })

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await categoryService.getAllCategories(req.user.id);

        if (categories.length === 0){
            res.status(200).json({ message: 'Nenhuma categoria encontrada.' })
        }

        res.status(200).json({ message: 'Lista de categorias:', data: categories })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.showCategory = async (req, res) => {
    try {
        const category = await categoryService.showCategory(req.params.id, req.user.id)
        res.status(200).json({ data: category })

    } catch (error) {
        res.status(404).json({ error: error.message })        
    }
}

exports.putCategory = async (req, res) => {
    const { name, color } = req.body;

    try {
        const category = await categoryService.putCategory(req.params.id, name, color)
        res.status(200).json({ message: 'Categoria atualizada', data: category })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.deleteCategory = async (req, res) => {
    try {
        await categoryService.deleteCategory(req.params.id)
        res.status(200).json({ message: 'Categoria deletada com sucesso' })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}