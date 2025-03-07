const userService = require('../services/userService');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json({ message: 'Lista de usuários:', data: users})
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}