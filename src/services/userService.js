const userRepository = require('../repositories/userRepository');

exports.getAllUsers = async () => {
    return await userRepository.findAll();
};