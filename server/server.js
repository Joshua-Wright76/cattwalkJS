var express = require('express');
var app = express();
const path = require('path');
const landingPagePath = path.join(__dirname, './../index.html')


app.use(express.static(__dirname +'./../'));
app.listen(3000);


app.get('/', (req, res) => {res.sendFile(landingPage)});

