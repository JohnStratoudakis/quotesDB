var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/quotes', function(req, res, next) {
  res.send('Sample Quote');
});

const schema = mongoose.Schema;
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

router.post('/addQuote', function(req, res, next) {
  console.log('/addQuote');

  // Add new quote to mongodb
  var quoteJson = req.body;
  quoteJson['quoteId'] = mongoose.Types.ObjectId();

  var QuoteModel = mongoose.model('newQuote', quoteSchema);
  var newQuote = new QuoteModel(quoteJson);
  newQuote.save(function(err) {
    if(err) {
      console.log('Error saving quote.');
      res
        .status(500)
        .send('Error saving quote: ' + JSON.stringify(err));
    } else {
      console.log('Quote successfully saved.');
      res
        .status(200)
        .send('Successfully added a quote by ' + quoteJson['author']);
    }
  });
});

router.post('/getQuote', function(req, res, next)  {
  console.log('/getQuote');
  var quoteJson = req.body;

  var QuoteModel = mongoose.model('newQuote', quoteSchema);
  const query = QuoteModel.findOne()
    .where('author')
    .in('William Shakespeare')
//    .exec((err, quote) => {
//      console.log('EEEEEE');
//      next();
//    })
      .then((quote) => {
        console.log('THEN');
        res
          .status(500)
          .send('Error');
        next();
      })
      .catch((error) => {
        console.log("CATCH");
        res
          .status(500)
          .send('Error');
        next();
      });
  //await query.exec();
  /*
  QuoteModel.findOne( {'author' : 'William Shakespeare'}, function(err, quotes) {
    if(err) {
      console.log('Error finding a quote by: ' + quote['author']);
      res
        .status(500)
        .send('Error');
    } else {
      console.log('Successfully retrieved one quote by ' + quotesJs['author']);
      res
        .status(200)
        .send('quote');
    }
  });
  */
  console.log('End of getQuote reached');
  //res
  //  .status(200)
  //  .send('quote');
});

module.exports = router;