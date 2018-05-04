var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/quotes', function(req, res, next) {
  res.send('Sample Quote');
});

router.post('/addQuote', function(req, res, next) {
  console.log('/addQuote');
  res.status(200)
     .send('Successfully added a quote by William Shakespeare');
});

router.post('/getQuote', function(req, res, next) {
  console.log('/getQuote');
  res.status(200)
      .send('quote');
});

module.exports = router;