var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "lanetteam.jinal@gmail.com",
        pass: "lanetteam1"
      }
    });
/* GET home page. */
var random;
module.exports = function(app) {
app.get('/', function(req, res, next) {

random = Math.floor(100000 + Math.random() * 900000);
console.log("in mail");
console.log(random);
transporter.sendMail({
      host : "localhost",               // smtp server hostname
      port : "25",                     // smtp server port
      domain : "localhost",             // domain used by client to identify itself to server
      to : "lanetteam.jigar@gmail.com",
      from : "lanetteam.jinal@gmail.com",
      subject : "node_mailer test email",
      html:"<h1>Qapp</h1><br><h3>Hii, This is your verification code with this you can signin</h3>" + random + "<h3>Thank you</h3>"
    },
    function(err, result){
      if(err){ console.log(err); }
      else{console.log("done");}
    });
});
}
