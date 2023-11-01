var express = require('express');
var router = express.Router();

const messages = [{
  text: "Hi there!",
  user: "Armando",
  added: new Date()
},
{
  text: "Hello World!",
  user: "Charles",
  added: new Date()
}]

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', { title: 'Message Board', messages: messages });
});

/* GET new message form */
router.get('/new', function(req, res, next) {
  res.render('form', {title: "New Message"});
});

/* Receive POST request form form */
router.post('/new', function(req, res, next) {
  console.log(req.body['message-author'], req.body['message-text'])
  messages.push({
    text: req.body['message-text'],
    user: req.body['message-author'],
    added: new Date()
  });
  res.redirect('/');
});

module.exports = router;
