const express = require('express');
var router = express.Router();
var Producmodel = require("../models/productModel")





// API: Upload một file
app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.json({ status: 0, link: '' });
    } else {
      const url = `http://localhost:3000/images/${file.filename}`;
      return res.json({ status: 1, url: url });
    }
  } catch (error) {
    console.log('Upload image error:', error);
    return res.json({ status: 0, link: '' });
  }
});

// Khởi động server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
