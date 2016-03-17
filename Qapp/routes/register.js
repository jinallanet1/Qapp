var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "lanetteam.jinal@gmail.com",
        pass: "lanetteam1"
      }
    });
var random;
var user = require('../model/tbluser.js');

module.exports = function(app) {

app.post('/register',function(req,res,next){
  random = Math.floor(100000 + Math.random() * 900000);
  var date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');

  user.registerNew(req.body.email, req.body.mobile, req.body.password, date, random, function (err, data) {
	    if (err)
			{
						res.json({status: '0', msg: ''});
	    }
      else if(data == false)
			{
            res.json({status: '0', msg : 'email is already exist'});
			}
			else
			{
        transporter.sendMail({
              host : "localhost",               // smtp server hostname
              port : "25",                     // smtp server port
              domain : "localhost",             // domain used by client to identify itself to server
              to : req.body.email,
              from : "lanetteam.jinal@gmail.com",
              subject : "node_mailer test email",
              html:"<img src='./images/add.png'><br><h1>Qapp</h1><br><h3>Hii, This is your verification code with this you can signin</h3>" + random + "<h3>Thank you</h3>"
            },
            function(err, result){
              if(err){ console.log(err); }
              else{ console.log("done"); }
            });
            res.json({status: '1'});
			}
	});
});
app.post('/signin',function(req,res,next){
  user.signin(req.body.email, req.body.password, function (err, data) {
	    if (err)
			{
						res.json(false);
	    }
      else if(data == false)
			{
            res.json({msg : 'wrong username or password'});
			}
			else
			{
            res.json(true);
			}
	});
});
app.get('/changeemail',function(req,res,next){
  user.changeEmail(req.body.email, function (err, data) {
	    if (err)
			{
						console.log(err);
	    }
			else
			{
				console.log(data);
			}
	});
});

}
