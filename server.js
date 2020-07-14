// requires
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const router = require('./router');
const db = require('./db');

let app = express();

// configs
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
let port = process.env.PORT || 8080;

// route
// static
app.use('', express.static(path.join(__dirname, 'app/build')));
// json
app.use('', router);

// db
db.defaults({ objects: [] })
  .write();

// execute
app.listen(port);
console.log("Server running on port: " + port);