import 'mocha';
import { expect } from 'chai';

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
var mongoose = require('mongoose');

chai.use(chaiHttp);

before((done) => {
  mongoose.connection.dropDatabase();
  done();
});

after((done) => {
  server.stop();
  done();
});

describe('Integration Tests', function (done) {
  it('Smoke Test', function (done) {
    chai.request(server)
      .get('/')
      .end((err, res) => {
        expect(err).to.be.eql(null);
        expect(res.status).to.be.eql(200);
        done();
      });
  });

  it('Check Version', function (done) {
    chai.request(server)
      .get('/version')
      .end((err, res) => {
        expect(err).to.be.eql(null);
        expect(res.status).to.be.eql(200);
        expect(res.text).to.be.eql('quotes_DB 0.0.4');
        done();
      });
  });

  it('Add Quote', function (done) {
    chai.request(server)
      .post('/quotes/addQuote')
      .send({
          author: 'William Shakespeare',
          quote: 'To be, or not to be, that is the question'
      })
      .end((err, res) => {
        expect(err).to.be.eql(null);
        expect(res.status).to.be.eql(200);
        expect(res.text).to.be.eql('Successfully added a quote by William Shakespeare');
        done();
      });
  });

  it('Get a William Shakespeare quote via a GET request', function (done) {
    chai.request(server)
      .post('/quotes/getQuote')
      .send({
          author: 'William Shakespeare',
          text: 'To be, or not to be, that is the question'
      })
      .end((err, res) => {
        expect(err).to.be.eql(null);
        expect(res.status).to.be.eql(200);
        var quoteJs = JSON.parse(res.text);
        expect(quoteJs['author']).to.be.eql('William Shakespeare');
        expect(quoteJs['quote']).to.be.eql('To be, or not to be, that is the question');
        done();
      });
  });
});