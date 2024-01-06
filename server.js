const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const fs = require('fs');


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/imageDiary', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connected to MongoDB');
});

// 수정 파트
//해결책:uploads 파일을 먼저 생성
const Storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'uploads/';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: Storage });

app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

// MongoDB 모델 정의
const Diary = mongoose.model('Diary', {
  title: String,
  content: String,
  imageUrl: String,
});




app.post('/api/upload', upload.single('image'), async (req, res) => {
  try {
    const { title, content } = req.body;


    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const newDiary = new Diary({ title, content, imageUrl });
    await newDiary.save();

    res.json({ success: true });
  } catch (error) {
    console.error('Error uploading:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});


// 이미지 수정
app.put('/api/upload/:id', upload.single('image'), async (req, res) => {
  try {
    const { title, content } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    // Update the diary entry with the new data
    const updatedDiary = await Diary.findByIdAndUpdate(req.params.id, {
      title,
      content,
      imageUrl,
    }, { new: true });

    res.json({ success: true, updatedDiary });
  } catch (error) {
    console.error('수정 오류:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// 이미지 삭제
app.delete('/api/upload/:id', async (req, res) => {
  try {
    // Find the diary entry by ID
    const deletedDiary = await Diary.findByIdAndDelete(req.params.id);

    // Delete the associated image file
    if (deletedDiary && deletedDiary.imageUrl) {
      const imagePath = `uploads/${deletedDiary.imageUrl.split('/').pop()}`;
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    res.json({ success: true, deletedDiary });
  } catch (error) {
    console.error('삭제 오류:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});




app.get('/api/diaries', async (req, res) => {
  try {
    const diaries = await Diary.find();
    res.json({ diaries });
  } catch (error) {
    console.error('Error fetching diaries:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});