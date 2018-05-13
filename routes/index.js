var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  res.status(200).send('random quote');
});

router.get('/version', function(req, res, next) {
  console.log('INDEX.JS');
  res.send('quotes_DB 0.0.1');
});

module.exports = router;
