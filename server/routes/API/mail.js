let express = require('express');
let router = express.Router();

var nodemailer = require('nodemailer');


router.get('/mail', (req, res) => {
  //var mail = req.body;
  var test = "mailOK"
  res.json(test);
  // check data integrity

  console.log(test)
});

router.post('/mail', (req, res, next) =>{
  var mail = req.body;

  console.log(mail.to.toString());
  var mailTo = mail.to.toString();
  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'zhaokaixing@gmail.com',
      pass: 'ZhaokaixingYYW'
    }
  });

  transporter.sendMail(mail, function(error, info){
    if(error){
      console.log(error);
    }else{
      console.log('Message sent: ' + info.response);
    }
  });

});

module.exports = router
