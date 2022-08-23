const multer = require('multer')

// Définir la config de stockage de multer
const storage = multer.diskStorage({
    // la destination ou seront par défault, stocker les fichiers 
    destination: (req, file, cb) => {
        cb(null, './public/images')
    },

    // définition du format du nom de l'image à stocker
    filename: (req, file, cb) => {
        const ext = file.originalname,
            date = Date.now(),
            completed = date + '_' + ext;
            
        console.log('Multer', file, completed)

        file.completed = completed
        cb(null, completed)
    }
})

const upload = multer({
    // on reprends la constante déclarer au dessus
    storage: storage,
    // on donne les limits des fichiers
    limits: {
        fileSize: 1 * 4098 * 4098,
        files: 1
    },
    // filtre qui permet d'indiquer quel types de fichiers est pris en compte
    fileFilter: (req, file, cb) => {
        if (
            file.mimetype === "image/png" ||
            file.mimetype === "image/jpg" ||
            file.mimetype === "image/gif" ||
            file.mimetype === "image/jpeg"
        ) {
            cb(null, true)
        } else {
            cb(null, false)
            cb(new Error('le fichier doit être au format png, jpg, jpeg ou gif'))
        }
    }
})

module.exports = upload