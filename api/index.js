const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');
const Post = require('./models/Post');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const app = express();
const cookieParser = require('cookie-parser');
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/' });
const fs = require('fs');

const salt = bcrypt.genSaltSync(10);
const secret = 'asiueuhaisehaiseh9sea';

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json());
app.use(cookieParser());

mongoose.connect("mongodb+srv://rafaelgomest:rafaelgomest@cluster0.lkz9qwo.mongodb.net/");

app.post('/register', async (req, res) => {
  const{username, password} = req.body;
  try{
    const userDoc = await User.create({
      username,
      password:bcrypt.hashSync(password,salt),
    });
    res.json(userDoc);
  } catch(e) {
    res.status(400).json(e);  }
});

app.post('/login', async (req,res) => {
  const {username, password} = req.body;
  const userDoc = await User.findOne({username});
  const passCorrect = bcrypt.compareSync(password, userDoc.password);
  if(passCorrect) {
    jwt.sign({username, id:userDoc._id}, secret, {}, (err,token) => {
      if(err) throw err;
      res.cookie('token', token).json({
        id:userDoc._id,
        username,
      });
    })
  } else {
    res.status(400).json('wrong credentials')
  }
})

app.post('/post', uploadMiddleware.single('file'), async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split('.');
  const ext = parts[parts.length-1];
  const newPath = path+'.'+ext;
  fs.renameSync(path, newPath)

  const{token} = req.cookies;

  jwt.verify(token, secret, {}, async (err, info) => {
    if(err) throw err;
    
    const {title, summary, content} = req.body;
    const postDoc = await Post.create({
      title,
      summary,
      content,
      cover: newPath,
      author: info.id,
    });
  res.json(postDoc);
});
})

app.get('/profile', (req, res) => {
  const {token} = req.cookies;
  jwt.verify(token, secret, {}, (err, info) => {
    if(err) throw err;
    res.json(info);
  });
});

app.get('/post', async(req,res) => {
  res.json(await Post.find());
})

app.post('/logout', (req,res) => {
  res.cookie('token', '').json('ok');
})

app.listen(4000);

//rafaelgomest
//mongosh "mongodb+srv://cluster0.lkz9qwo.mongodb.net/" --apiVersion 1 --username rafaelgomest