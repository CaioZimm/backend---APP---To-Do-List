const userRepository = require('../repositories/userRepository');

exports.getAllUsers = async () => {
    return await userRepository.findAll();
};

exports.getMyProfile = async (id) => {
    return await userRepository.showProfile(id);
}

exports.getUser = async (id) => {
    return await userRepository.showUser(id);
}

exports.putUser = async (id, name, email) => {
    return await userRepository.updateUser(id, { name, email });
}

exports.putPassword = async (id, password_current, new_password) => {
    return await userRepository.updatePassword(id, password_current, new_password);
}

exports.deleteUser = async (id) => {
    return await userRepository.deleteUser(id);
}