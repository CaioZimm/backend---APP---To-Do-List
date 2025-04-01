const bcrypt = require('bcrypt')
const fs = require('fs')
const path = require('path')
const User = require('../models/User')

exports.findAll = async () => {
    return await User.find();
}

exports.showProfile = async (id) => {
    try {
        const user = await User.findById(id);

        return user;

    } catch (error) {
        throw new Error('Erro ao mostrar seu perfil ' + error.message);
    }
}

exports.showUser = async (id) => {
    try {
        const user = await User.findById(id);

        if(!user){
            throw new Error('Usuário não encontrado')
        }

        return user;

    } catch (error) {
        throw new Error('Erro ao buscar usuário: ' + error.message);
    }
}

exports.updateUser = async (id, updatedUser) => {
    try {
        const user = await User.findByIdAndUpdate(id, updatedUser, {new: true, runValidators: true })

        if(!user){
            throw new Error('Usuário não encontrado')
        }

        if( updatedUser.name === user.name && updatedUser.email === user.email) {
            throw new Error('Nenhuma alteração feita')
        }
        
        return user;

    } catch (error) {
        throw new Error('Erro ao atualizar perfil: ' + error.message);
    }
}

exports.updatePhoto = async (id, photo) => {
    try {
        const user = await User.findById(id)

        if(!user){
            throw new Error('Usuário não encontrado')
        }

        if(user.photo !== 'uploads/default.png'){
            const filePath = path.join(__dirname, '..', '..', user.photo)

            if(fs.existsSync(filePath)){
                fs.unlinkSync(filePath)
            }
        }

        user.photo = photo
        await user.save()

        return user;

    } catch (error) {
        throw new Error('Erro ao atualizar perfil: ' + error.message);
    }
}

exports.updatePassword = async (id, password_current, new_password) => {
    try {
        const user = await User.findById(id);

        if(!user){
            throw new Error('Usuário não encontrado')
        }

        const verifyPassword = await bcrypt.compare(password_current, user.password);

        if(!verifyPassword){
            throw new Error('A senha atual está incorreta.');
        }

        const samePassword = await bcrypt.compare(new_password, user.password);
        if(samePassword){
            throw new Error('A nova senha deve ser diferente da anterior.')
        }

        const salt = await bcrypt.genSalt(12);
        user.password = await bcrypt.hash(new_password, salt)

        await user.save();
        return user;

    } catch (error) {
        throw new Error('Erro ao atualizar senha: ' + error.message);
    }
}

exports.deleteUser = async (id) => {
    try {
        const user = await User.findById(id);

        if(!user){
            throw new Error('Usuário não encontrado')
        }

        await user.deleteOne()
        return;

    } catch (error) {
        throw new Error('Erro ao deletar usuário' + error.message);
    }
}