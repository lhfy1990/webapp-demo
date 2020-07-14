
const express = require('express');

const api = require('./api');

let router = express.Router();
// middleware to avoid router from stopping halfway
router.use(function (req, res, next) {
  next();
});

router.use('/api', api);

module.exports = router;
