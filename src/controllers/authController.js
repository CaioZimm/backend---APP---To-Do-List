const authService = require('../services/authService')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/User')

exports.registerUser = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body

    if (password !== confirmPassword){
        return res.status(400).json( { error: 'As senhas não estão iguais.'})
    }

    try {
        const user = await authService.registerUser(name, email, password);
        res.status(201).json({ message: 'Usuário criado com sucesso', data: user})

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
}

exports.loginUser = async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email: email})

    if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' })
    }

    const checkPassword = await bcrypt.compare(password, user.password)

    if (!checkPassword){
        return res.status(422).json({ message: 'Senha incorreta'})
    }

    try {
        const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET);
        return res.status(200).json({ message: 'Logado com sucesso', token})

    } catch (error) {
        res.status(500).json({ message: error })
    }
}