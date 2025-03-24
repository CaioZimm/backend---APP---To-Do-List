const categoryRepository = require('../repositories/categoryRepository')

exports.createCategory = async (name, color, idUser) => {
    const newCategory = {
        name,
        color,
        idUser
    }

    return await categoryRepository.create(newCategory);
}

exports.getAllCategories = async (idUser) => {
    return await categoryRepository.index(idUser);
}

exports.showCategory = async (id, idUser) => {
    return await categoryRepository.showCategory(id, idUser);
}

exports.putCategory = async (id, name, color) => {
    return await categoryRepository.updateCategory(id, { name, color });
}

exports.deleteCategory = async (id) => {
    return await categoryRepository.deleteCategory(id);
}