const axios = require('axios');
const FormData = require('form-data');
const IMAGE_API_KEY = process.env.IMAGE_API_KEY;

exports.imageUploader = async (file) => {
  const formData = new FormData();
  formData.append('key', IMAGE_API_KEY);
  const image = file.buffer.toString('base64');
  formData.append('image', image);

  const response = await axios.post('https://api.imgbb.com/1/upload', formData, {
    headers: formData.getHeaders(),
  });

  return response?.data?.data?.url;
}
