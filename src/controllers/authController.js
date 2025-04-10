const authService = require('../services/authService')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Redis = require('ioredis')
const redis = new Redis()
const User = require('../models/User')

exports.registerUser = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body

    if (password !== confirmPassword){
        return res.status(400).json( { error: 'As senhas não estão iguais.'})
    }

    try {
        const user = await authService.registerUser(name, email, password);
        const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET, { expiresIn: '4h'});

        return res.status(201).json({ message: 'Usuário criado com sucesso', token, data: user })

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
}

exports.loginUser = async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email: email})

    if (!user) {
        return res.status(404).json({ message: 'Credenciais incorretas' })
    }

    const checkPassword = await bcrypt.compare(password, user.password)

    if (!checkPassword){
        return res.status(422).json({ message: 'Credenciais incorretas' })
    }

    try {
        const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET, { expiresIn: '4h'});
        return res.status(200).json({ message: 'Logado com sucesso', token})

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

exports.logoutUser = async (req, res) => {
    const token = req.header('Authorization').replace('Bearer ', '');

    try {
        await redis.setex(`blacklist:${token}`, 14400, 'invalid');

        return res.status(200).json({ message: 'Deslogado com sucesso' });

    } catch (error) {
        return res.status(500).json({ message: 'Erro ao deslogar: ' + error.message });
    }
}