const User = require('../models/User')
const bcrypt = require('bcrypt')

exports.forgotPassword = async (email, resetCode, codeExpires) => {
    try {
        const user = await User.findOne({ email: email })

        if (!user){
            throw new Error('Usuário não encontrado')
        }

        user.resetCode = resetCode
        user.codeExpires = codeExpires
        await user.save()

        return user;

    } catch (error) {
        throw new Error(error.message);
    }
}

exports.resetPassword = async (resetCode, newPassword) => {
    try {
        const user = await User.findOne({ resetCode: resetCode })

        if (!user){
            throw new Error('Usuário não encontrado')
        }

        const samePassword = await bcrypt.compare(newPassword, user.password)
        if (samePassword){
            throw new Error('A senha deve ser diferente da anterior')
        }

        const salt = await bcrypt.genSalt(12)
        user.password = await bcrypt.hash(newPassword, salt)

        await User.updateOne(
            { _id: user._id }, 
            { $unset: {codeExpires: "", resetCode: "" } }
        )

        await user.save()

        return user;

    } catch (error) {
        throw new Error(error.message);
    }
}