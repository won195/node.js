var express = require('express');
var session = require('express-session');
app.use(session({
    secret: '123456789',
    resave: false,
    saveUninitialized: true
}));
app.get('/count',function(req, res){
    req.session.count = 1;
    res.send('hi seesion');
});
app.listen(3003, function(){
    console.log('Connected 3003 port');
});