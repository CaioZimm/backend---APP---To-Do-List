const mongoose = require('mongoose');
const Category = require('../models/Category')

exports.create = async (category) => {
    try {
        const newCategory = new Category({
            name: category.name,
            color: category.color,
            idUser: new mongoose.Types.ObjectId(category.idUser)
        })

        await newCategory.save()
        return newCategory;

    } catch (error) {
        throw new Error('Erro ao criar uma nova categoria: ' + error.message)
    }
}

exports.index = async (idUser) => {
    return await Category.find({ idUser: idUser });
}

exports.showCategory = async (id, idUser) => {
    try {
        const category = await Category.findOne({ _id: id, idUser: idUser})

        if(!category){
            throw new Error('Categoria não encontrada.')
        }

        return category;

    } catch (error) {
        throw new Error(error.message)
    }
}

exports.updateCategory = async (id, updatedCategory) => {
    try {
        const category = await Category.findByIdAndUpdate(id, updatedCategory, { new: true, runValidators: true })

        if(!category){
            res.status(404).json({ message: 'Categoria não encontrada'})
            return
        }

        return category;

    } catch (error) {
        throw new Error('Erro ao atualizar categoria ' + error.message);
    }
}

exports.deleteCategory = async (id) => {
    try {
        const category = await Category.findById(id)

        if(!category){
            res.status(404).json({ message: 'Categoria não encotrada'})
            return
        }

        await category.deleteOne()
        return;

    } catch (error) {
        throw new Error('Erro ao deletar categoria ' + error.message);
    }
}