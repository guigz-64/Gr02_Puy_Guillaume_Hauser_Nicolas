var signin = require('./login/signin');

const express = require('express');
const bodyParser = require('body-parser');

var app = express();


const config = {
  port: 3002
};
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.listen(config.port, () => {
  console.log(`Chat is waiting for you at http://localhost:${config.port}`)
});

app.use('/',signin);