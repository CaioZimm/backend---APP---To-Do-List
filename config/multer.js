const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'uploads/')
    },
    
    filename: (req, file, callback) => {
        const time = new Date().getTime()

        callback(null, `${time}_${file.originalname}`)
    }
})

exports.upload = multer({
    storage,
    fileFilter: (req, file, callback) => {
        const allowedFormatted = ['image/jpeg', 'image/png', 'image/jpg', 'image/svg']
        if (allowedFormatted.includes(file.mimetype)){
            callback(null, true)
        }
        else {
            callback(new Error('Formato de imagem inválido.'))
        }
    }
})