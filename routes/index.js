var express = require('express');
var router = express.Router();
require('dotenv').config();
const { MongoClient } = require('mongodb');
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('connected to MongoDB');
    const database = client.db('messages');
    return database;
  } catch (err) {
    throw err;
  }
}
const db = connectToDatabase();

/* GET home page. */
router.get('/', async function(req, res, next) {
  try {
    const database = await db;
    const messagesCollection = database.collection('messages');
    const messages = await messagesCollection.find().toArray();
    console.log(messages);
    res.render('index', { title: 'Message Board', messages: messages });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

/* GET new message form */
router.get('/new', function(req, res, next) {
  res.render('form', {title: "New Message"});
});

/* Receive POST request form form */
router.post('/new', async function(req, res, next) {
  const newMessage = {
    text: req.body['message-text'],
    author: req.body['message-author'],
    date: new Date(),
  };
  
  try {
    const database = await db;
    const messagesCollection = database.collection('messages');
    await messagesCollection.insertOne(newMessage);
    res.redirect('/');
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
