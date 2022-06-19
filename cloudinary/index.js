const cloudinary = require('cloudinary').v2;
const { cloudinaryStorage, CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    aoi_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
    url: process.env.CLOUDINARY_URL
});

const storage = new CloudinaryStorage({
    cloudinary,
    folder: 'YelpCamp',
    allowed_formats: ['jpg', 'jpeg', 'png']
});

module.exports = { cloudinary, storage };