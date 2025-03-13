const bcrypt = require('bcrypt')
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
            res.status(404).json({message: 'Usuário não encontrado'})
            return
        }

        return user;

    } catch (error) {
        throw new Error('Usuário não encontrado');
    }
}

exports.updateUser = async (id, updatedUser) => {
    try {
        const user = await User.findByIdAndUpdate(id, updatedUser, {new: true, runValidators: true })

        if(!user){
            res.status(404).json({message: 'Usuário não encontrado'})
            return
        }

        return user;

    } catch (error) {
        throw new Error('Erro ao atualizar perfil ' + error.message);
    }
}

exports.updatePassword = async (id, password_current, new_password) => {
    try {
        const user = await User.findById(id);

        if(!user){
            res.status(404).json({message: 'Usuário não encontrado'})
            return
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
            res.status(404).json({ message: 'Usuário não encontrado'})
            return
        }

        await user.deleteOne()
        return;

    } catch (error) {
        throw new Error('Erro ao deletar usuário' + error.message);
    }
}