const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.header('Authorization')

    if(!token || !token.startsWith('Bearer ')){
        return res.status(401).json({ message: 'Acesso negado, usuário não autenticado.'})
    }

    try {
        const verify = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
        req.user = verify;
        next();

    } catch (error) {
        res.status(400).json({ error: 'Token inválido' })
    }
}