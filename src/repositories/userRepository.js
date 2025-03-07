const User = require('../models/User')

exports.findAll = async () => {
    return await User.find();
}