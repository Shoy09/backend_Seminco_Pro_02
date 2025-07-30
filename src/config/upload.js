const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary'); // Importa la configuración de Cloudinary

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'firmas', // La carpeta en Cloudinary
        format: async (req, file) => 'png', // Forzar formato PNG
        public_id: (req, file) => `firma_mina2${Date.now()}`
    }
});

const upload = multer({ storage });

module.exports = upload;
