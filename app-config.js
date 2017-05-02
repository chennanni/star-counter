// register module
var express = require('express');
var routes = require('./routers/main-router.js');
var app = express();
var path = require('path');

// expose the public folder
app.use(express.static(path.join(__dirname, 'public')));
console.log(path.join(__dirname, 'public'));

// setup view engine
app.set('view engine', 'jade');

// setup router
app.use('/', routes);

// setup listening port
app.listen(process.env.PORT || 8080, function () {
  console.log('Example app listening on port 8080!');
});