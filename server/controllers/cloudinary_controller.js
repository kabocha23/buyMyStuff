const cloudinary = require('cloudinary');


module.exports = {
  upload(req, res) {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const api_secret = process.env.CLOUDINARY_API_SECRET;
    const signature = cloudinary.utils.api_sign_request({timestamp: timestamp}, api_secret);
    const payload = {
      timestamp,
      signature 
    }
    res.status(200).send(payload);
  }
};