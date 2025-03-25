const userService = require('../services/userService');
const Redis = require('ioredis')
const redis = new Redis()

exports.getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        return res.status(200).json({ message: 'Lista de usuários:', data: users})
        
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

exports.getMyProfile = async (req, res) => {
    try {
        const user = await userService.getMyProfile(req.user.id);
        return res.status(200).json({ data: user })

    } catch (error) {
        return res.status(404).json({ error: error.message })        
    }
}

exports.getUser = async (req, res) => {
    try {
        const user = await userService.getUser(req.params.id);
        return res.status(200).json({ data: user })

    } catch (error) {
        return res.status(404).json({ error: error.message })      
    }
}

exports.putUser = async (req, res) => {
    const { name, email } = req.body

    if (!name && !email){
        return res.status(400).json({ message: 'Nenhuma alteração feita.' })
    }

    try {
        const updatedUser = await userService.putUser(req.user.id, name, email);
        return res.status(200).json({ message: 'Usuário atualizado', data: updatedUser })

    } catch (error) {
        return res.status(404).json({ error: error.message })   
    }
}

exports.putPassword = async (req, res) => {
    const { password_current, new_password, new_password_confirm } = req.body

    if(new_password !== new_password_confirm){
        return res.status(400).json( { error: 'As senhas não estão iguais.'})
    }

    try {
        await userService.putPassword(req.user.id, password_current, new_password);
        return res.status(200).json({ message: 'Senha atualizada com sucesso!'})

    } catch (error) {
        return res.status(404).json({ error: error.message })
    }
}

exports.deleteUser = async (req, res) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    
    try {
        await userService.deleteUser(req.user.id);
        await redis.setex(`blacklist:${token}`, 3600, 'invalid');

        return res.status(200).json({ message: 'Usuário deletado com sucesso'})

    } catch (error) {
        return res.status(404).json({ error: error.message })   
    }
}