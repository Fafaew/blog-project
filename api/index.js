const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const app = express();

const salt = bcrypt.genSaltSync(10);
const secret = 'asiueuhaisehaiseh9sea';

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json());

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
      res.cookie('token', token).json('ok');
    })
  } else {
    res.status.json('wrong credentials')
  }
})

app.listen(4000);

//rafaelgomest
//mongosh "mongodb+srv://cluster0.lkz9qwo.mongodb.net/" --apiVersion 1 --username rafaelgomest