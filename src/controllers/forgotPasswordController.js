const forgotPasswordService = require('../services/forgotPasswordService')

exports.forgotPasswordUser = async (req, res) => {
    const { email } = req.body;

    try {
        await forgotPasswordService.forgotPasswordUser(email)

        return res.status(200).json({ message: 'Código enviado para o e-mail' })

    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}

exports.resetPasswordUser = async (req, res) => {
    const { resetCode, newPassword, newPasswordConfirm } = req.body;

    if (newPassword !== newPasswordConfirm){
        return res.status(400).json({ error: 'As senhas não estão iguais'})
    }

    try {
        await forgotPasswordService.resetPasswordUser(resetCode, newPassword)

        return res.status(200).json({ message: 'Senha atualizada com sucesso' })

    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}