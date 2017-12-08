var express = require("express");
var session = require('express-session');
var app = express();
var bodyParser = require('body-parser');
app.use(session({secret: 'codingdojorocks'})); 
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.get('/', function (req, res) {
    if(!req.session.number){
        var num = Math.floor(Math.random()*100)+1;
        req.session.number=num;
    }
    console.log('The number is: ' + req.session.number)
    if(!req.session.guess){
        var result={
            'str': null
        }
    }
    else if(req.session.guess>req.session.number){
        var result={
            'str': "Too high!"
        }
    }
    else{
        var result={
            'str': "Too low!"
        }
    }
    res.render('index', {result: result})
});

app.get('/success', function (req, res) {
    var result={
        'str': req.session.number + " was the number!"
    }
    res.render('success',{result:result})
});

app.post('/process', function (req, res){
    req.session.guess=req.body.guess;
    console.log(req.session);
    if(req.session.number != req.session.guess){
        res.redirect('/');
    }
    else{
        res.redirect('/success');
    }
});

app.post('/reset', function(req, res){
    req.session.destroy();
    res.redirect('/');
});

app.listen(8000, function () {
    console.log("listening on port 8000");
})