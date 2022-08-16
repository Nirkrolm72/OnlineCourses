const multer = require('multer');

const MIME_TYPES = {
    "image/àjpg": "jpg",
    "image/jpeg": "jpg",
    "image/gif": "gif",
    "image/png": "png"
};

// La destination du fichier (répertoire)
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images');
    },
    filename: (req, file, callback) => {
        // Supprimer les espaces dans le nom du fichier
        const name = file.originalname.split(" ").join("_");
        const extension = MIME_TYPES[file.mimetype];

        callback(null, name + "_" + Date.now() + extension);
    }
});





module.exports = multer({storage: storage}).single("images");