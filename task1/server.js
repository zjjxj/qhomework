var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

app.get("/",function (req,res) {
    res.redirect("/index.html");
});

app.get('/getData',function (req,res) {
       // res.json('./mockData/flightList.json');
    res.sendfile('./mockData/flightList.json');
});

app.listen(8080,function () {
   console.log("listening at port 8080");
});
