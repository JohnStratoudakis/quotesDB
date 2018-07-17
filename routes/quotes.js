var express = require('express');
var router = express.Router();

var app2 = require('../app');

var mongoose = require('mongoose');
var schema = mongoose.Schema;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/quotes', function(req, res, next) {
  res.send('Sample Quote');
});

//const schema = mongoose.Schema;
var Schema = mongoose.Schema;
const quoteSchema = new Schema({
  quote: {
    type: String,
    unique: false,
    required: true
  },
  author: {
    type: String,
    unique: false,
    required: true
  },
  quoteId: {
    type: String,
    unique: true,
    required: true
  }
});

router.get('/random', function(req, res, next) {
  console.log('/random');

//  var QuoteModel = mongoose.model('newQuote', quoteSchema);
//  const query = QuoteModel.findOne()
//    .then((quote) => {
//      console.log('/random returning: ' + quote);
//      res
//        .status(200)
//        .send(quote);
//    })
//    .catch((error) => {
//      console.log("CATCH");
//      res
//        .status(500)
//        .send('Error: ' + error);
//    });
});

router.post('/addQuote', function(req, res, next) {
  console.log('/addQuote');
//  console.log('Request: ' + JSON.stringify(req.body));

  var quoteJson = req.body;
  quoteJson['quoteId'] = mongoose.Types.ObjectId();

  var QuoteModel = mongoose.model('newQuote', quoteSchema);

  // Check if quote already exists
  QuoteModel.find({
    author: "William Shakespeare"
  }, function(err, docs) {
    if(err) {
      console.log("Error: " + err);
    } else {
      if(docs.length == 0) {
        var newQuote = new QuoteModel(quoteJson);
        newQuote.save(function(err) {
        if(err) {
          console.log('Error saving quote.');
          res.status(400).send('Error saving quote: ' + JSON.stringify(err));
        } else {
          console.log('Quote successfully saved.');
          res.status(200).send('Successfully added a quote by ' + quoteJson['author']);
        }
      });
      } else {
        res.status(406).send('Quote with same author already exists');
      }
    }
  });
});

router.post('/getQuote', function(req, res, next)  {
  console.log('/getQuote');
  var quoteJson = req.body;
  var QuoteModel = mongoose.model('newQuote', quoteSchema);

  // Check if quote already exists
  QuoteModel.find({
    author: quoteJson.author
  }, function(err, docs) {
    if(err) {
      console.log("Error: " + err);
    } else {
      if(docs.length == 0) {
        console.log("None found");
        res.status(400).send('No quotes found');
      } else {
        res.status(200).send(docs[0]);
      }
    }
  });
  console.log('End of getQuote reached');
});

module.exports = router;