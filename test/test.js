const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const baseUrl = 'localhost:' + (process.env.PORT || 8080);
const db = require('../db');

describe('Objects', function () {
  // reset database after test
  const objects = db.get('objects').value();
  before(function () {
    db.set('objects', []).write();
  });
  after(function () {
    db.set('objects', objects).write();
  });
  describe('Forbidden operations', function () {
    it('put to collection', done => {
      chai.request(baseUrl)
        .put('/api/objects/')
        .send({})
        .end((err, res) => {
          if (err) { return done(err); }
          if (!res) {
            return done(new Error('Response is expected but got none.'));
          }
          if (res.status() !== 405) {
            return done(new Error(`Response status code 405 expected but got ${res.status()}.`));
          }
          done();
        });
    });
  });
  describe('Post one object', function () {
    it('post one valid object', done => {
      chai.request(baseUrl)
        .post('/api/objects/')
        .send({ name: 'test' })
        .end((err, res) => {
          if (err) { return done(err); }
          if (!res || !res.body) {
            return done(new Error('Response is expected but got none.'));
          }
          if (res.status() !== 201) {
            return done(new Error(`Response status code 405 expected but got ${res.status()}.`));
          }
          let body = res.body;
          if (!body.id) {
            return done(new Error(`Response body is expecting a new entry with id but got no id.`));
          }
          done();
        });
    });
  });
  describe('Get objects by query', function () {
    it('get one valid object', done => {
      chai.request(baseUrl)
        .get('/api/objects?name=test')
        .end((err, res) => {
          if (err) { return done(err); }
          if (!res || !res.body) {
            return done(new Error('Response is expected but got none.'));
          }
          if (res.status() !== 200) {
            return done(new Error(`Response status code 405 expected but got ${res.status()}.`));
          }
          let body = res.body;
          if (!Array.isArray(body)) {
            return done(new Error(`Response body is expecting a new entry with id but got no id.`));
          }
          done();
        });
    });
  });
  /// some other tests we will write here
});
