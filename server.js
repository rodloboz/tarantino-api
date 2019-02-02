const express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  Quote = require('./api/models/quoteListModel'),
  bodyParser = require('body-parser');


const mongoose = require("mongoose");
app.use((req, res, next) => {
  console.log("use for mongoose callback");
  if (mongoose.connection.readyState) {
    console.log("if (mongoose.connection.readyState)");
    next();
  } else {
    console.log("else (mongoose.connection.readyState)");
    require("./mongo")().then(() => next());
    console.log("else (mongoose.connection.readyState)");
  }
});
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Tarantinodb', {
  useNewUrlParser: true
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const routes = require('./api/routes/quoteListRoutes');
routes(app);

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port);

console.log('Tarantino RESTful API server started on: ' + port);
