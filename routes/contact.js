var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('contact', { title: 'Contact' });
});

router.post('/send', function(req, res, next) {
  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'something@gmail.com',
      pass: 'something'
    },
  });

  var mailOptions = {
    from: 'John Doe <johndoe@example.com>',
    to: 'something@gmail.com',
    subject: 'Website Submission',
    text: 'You have a new submission with the following details...' +
          'Name: ' + req.body.name +
          'Email: ' + req.body.email +
          'Message: ' + req.body.message,
    html: '<p>You have a new submission with the following details...</p>' +
          '<dl><dt>Name:</dt><dd>' + req.body.name +
              '<dt>Email:</dt><dd>' + req.body.email +
              '<dt>Message:</dt><dd>' + req.body.message +
          '</dl>'
  };

  transporter.sendMail(mailOptions, function(err, info) {
    if (err) {
      console.log(err);
      res.redirect('/');
    } else {
      console.log('Message sent: ' + info.response);
      res.redirect('/');
    }
  });
});

module.exports = router;
