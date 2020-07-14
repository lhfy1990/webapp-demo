const express = require('express');

const objects = require('./objects');

let router = express.Router();
// middleware to avoid router from stopping halfway
router.use(function (req, res, next) {
  next();
});
router.get('/',
  function (req, res) {
    res.json({
      message: "hello, RESTful!"
    });
  });

router.use('/objects', objects);

module.exports = router;