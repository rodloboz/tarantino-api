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

const routes = require('./api/routes/quoteListRoutes');
routes(app);

// Middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors({
    origin: 'http://localhost',
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.options('*', cors())

app.all('', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    //Auth Each API Request created by user.
    next();
});

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port);

console.log('Tarantino RESTful API server started on: ' + port);
