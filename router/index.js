
const express = require('express');

const api = require('./api');

let router = express.Router();

// middleware to avoid router from stopping halfway
router.use(function (req, res, next) {
  next();
});

router.route('/register')
  .post(function (req, res) {
    let body = req.body;
    
  });

router.route('/auth')
  .post(function (req, res) {
    let body = req.body;

  });

// use
router.use('/api', api);



module.exports = router;
