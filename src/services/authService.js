const bcrypt = require('bcrypt')
const authRepository = require('../repositories/authRepository');

exports.registerUser = async (name, email, password) => {
    const salt = await bcrypt.genSalt(12)
    const passwordCrypt = await bcrypt.hash(password, salt)

    const newUser = {
        name,
        email,
        password: passwordCrypt,
        createdAt: Date.now()
    }

    return await authRepository.register(newUser);
}

exports.loginUser = async (email, password) => {
    return await authRepository.login(email, password)
}