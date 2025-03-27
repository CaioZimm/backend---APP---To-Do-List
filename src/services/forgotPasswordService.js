const forgotPasswordRepository = require('../repositories/forgotPasswordRepository')
const User = require('../models/User')
const nodemailer = require('nodemailer')
const crypto = require('crypto')
const moment = require('moment-timezone')

const emailer = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 587,
    auth: {
        user: '65ebb366f8a6d9',
        pass: '563592b0d8d751'
  }
})

exports.forgotPasswordUser = async (email) => {
    try {
        const resetCode = crypto.randomInt(100000, 999999).toString();
        const codeExpires = moment().add(30, 'minutes').toDate();

        const user = await forgotPasswordRepository.forgotPassword(email, resetCode, codeExpires)

        var mailSend = {
            from: 'sandbox.smtp.mailtrap.io',
            to: user.email,
            subject: 'Redefinição de Senha',
            html: `<h2>Seu código de redefinição de senha: </h2> <br> <h1>${resetCode}</h1> <br> Expira em 30 minutos.`
        }

        await emailer.sendMail(mailSend)
        
    } catch (error) {
        throw new Error(error.message)
    }
}

exports.resetPasswordUser = async (resetCode, newPassword) => {
    try {
        const user = await User.findOne({ resetCode: resetCode })

        if(!user || user.resetCode !== resetCode){
            throw new Error('Código inválido')
        }

        if(new Date(user.codeExpires) < new Date()){
            throw new Error('Código expirado')
        }

        return await forgotPasswordRepository.resetPassword(resetCode, newPassword)

    } catch (error) {
        throw new Error(error.message)
    }
}