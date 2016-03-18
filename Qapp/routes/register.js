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
//====================================================== register =======================
app.post('/register',function(req,res,next){
  if(req.body.email == "" || req.body.mobile == "" || req.body.password == "" || req.body.email == undefined || req.body.password == undefined || req.body.mobile == undefined)
  {
    res.json({status: '0', msg : 'please fill data'});
  }
  else
  {
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
                          html:"<h1>Qapp</h1><br><h3>Hii, This is your verification code with this you can signin</h3>" + random + "<h3>Thank you</h3>"
                        },
                        function(err, result){
                          if(err)
                          {
                            console.log("in if");
                             console.log(err);
                             res.json({status: '1',msg: 'error in sending mail'});
                           }
                          else
                          {
                            console.log("in else");
                              console.log("done");
                              res.json({status: '1',msg: 'Your Account has been created'});
                          }
                        });
            			  }
            	});
      }
});
//================================================== signin ===========================
app.post('/signin',function(req,res,next){
  if(req.body.email == "" || req.body.password == "" || req.body.email == undefined || req.body.password == undefined)
  {
    res.json({status: '0', msg : 'please fill data'});
  }
  else
  {
            user.signin(req.body.email, req.body.password, function (err, data) {
          	    if (err)
          			{
          						res.json({status: '0', msg:''});
          	    }
                else if(data == false)
          			{
                      res.json({status: '0', msg : 'wrong username or password'});
          			}
          			else
          			{
                      res.json({status: '1', msg:'successfully signin'});
          			}
          	});
}
});
//============================================ change email ==========================
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
//============================================ resend =================================
app.get('/resend',function(req,res,next){
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
//========================================== forgot password=========================
  app.get('/forgotpassword',function(req,res,next){
    user.forgotPassword(req.body.email, function (err, data) {
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
