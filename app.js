/*
* Author: Rohit Kumar
* Date: 03-09-2015
* Website: iamrohit.in
* App Name: Session Handling using Nodejs & Express 4
* Description: This is a simple script to demonstrate session handling in nodejs and socket.io 
*/
var http=require('http');
var express=require('express');
var path=require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
var app=express();
var port = Number(process.env.PORT || 5000);
app.use(session({secret: 'ABCDEF123456789', cookie: { maxAge: 60000 }})); // Set some rendom secret value for your session
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({
  extended: true
}));

// Home page
app.get('/',function(req,res){
   if(!req.session.name && !req.session.email) {
       res.render('index');
    } else {
        res.render('index', {name:req.session.name, email:req.session.email});
    }
});

app.post('/',function(req,res){
  if(req.body.name && req.body.email) {
        req.session.name = req.body.name;
        req.session.email = req.body.email;
        result = req.session;
  }
   res.redirect('/');
});

app.get('/destroy', function(req, res) {
   req.session.destroy(function(err){
      if(err){
        console.log(err);
      }
      else
      {
        res.redirect('/');
      }
    });
});

// Starting server
var server = http.createServer(app).listen(port, function() {
console.log("Listening on "+port);
});
