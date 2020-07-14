const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const baseUrl = 'localhost:' + (process.env.PORT || 8080);

describe('Objects', function () {
  const basePath = '/api/objects';
  let id = null;
  describe('Forbidden operations', function () {
    it('put to collection', done => {
      chai.request(baseUrl)
        .put(basePath + '/')
        .send({})
        .end((err, res) => {
          if (err) { return done(err); }
          if (!res) {
            return done(new Error('Response is expected but got none.'));
          }
          if (res.status !== 405) {
            return done(new Error(`Response status code 405 expected but got ${res.status}.`));
          }
          done();
        });
    });
    it('patch to collection', done => {
      chai.request(baseUrl)
        .patch(basePath + '/')
        .send({})
        .end((err, res) => {
          if (err) { return done(err); }
          if (!res) {
            return done(new Error('Response is expected but got none.'));
          }
          if (res.status !== 405) {
            return done(new Error(`Response status code 405 expected but got ${res.status}.`));
          }
          done();
        });
    });
    it('delete to collection', done => {
      chai.request(baseUrl)
        .delete(basePath + '/')
        .send()
        .end((err, res) => {
          if (err) { return done(err); }
          if (!res) {
            return done(new Error('Response is expected but got none.'));
          }
          if (res.status !== 405) {
            return done(new Error(`Response status code 405 expected but got ${res.status}.`));
          }
          done();
        });
    });
  });
  describe('Post one object', function () {
    it('post one invalid object', done => {
      // our api does not have validation for it yet
      done();
    });
    it('post one valid object', done => {
      chai.request(baseUrl)
        .post(basePath + '/')
        .send({ name: 'test' })
        .end((err, res) => {
          if (err) { return done(err); }
          if (!res || !res.body) {
            return done(new Error('Response is expected but got none.'));
          }
          if (res.status !== 201) {
            return done(new Error(`Response status code 201 expected but got ${res.status}.`));
          }
          let body = res.body;
          if (!body.id) {
            return done(new Error(`Response body is expected as a new entry with id but got no id.`));
          }
          id = body.id;
          done();
        });
    });
  });
  describe('Get objects by query', function () {
    it('get objects with invalid query', done => {
      // our api does not have validation for it yet
      done();
    });
    it('get objects with valid query', done => {
      chai.request(baseUrl)
        .get(basePath + '?name=test')
        .end((err, res) => {
          if (err) { return done(err); }
          if (!res || !res.body) {
            return done(new Error('Response is expected but got none.'));
          }
          if (res.status !== 200) {
            return done(new Error(`Response status code 200 expected but got ${res.status}.`));
          }
          let body = res.body;
          if (typeof body.count === 'undefined' || body.count === null) {
            return done(new Error(`Response body is expected as a packet with count but got no count.`));
          }
          if (typeof body.offset === 'undefined' || body.offset === null) {
            return done(new Error(`Response body is expected as a packet with offset but got no offset.`));
          }
          if (!Array.isArray(body.data)) {
            return done(new Error(`Response body is expected as a packaet with data arry but got no data array.`));
          }
          done();
        });
    });
  });
  describe('Get one object by id', function () {
    it('get one object by invalid id', done => {
      chai.request(baseUrl)
        .get(basePath + '/' + 'abc')
        .end((err, res) => {
          if (err) { return done(err); }
          if (!res || !res.body) {
            return done(new Error('Response is expected but got none.'));
          }
          if (res.status !== 404) {
            return done(new Error(`Response status code 404 expected but got ${res.status}.`));
          }
          done();
        });
    });
    it('get one object by invalid id', done => {
      // our api does no have validation for it yet
      done();
    });
    it('get one valid object', done => {
      chai.request(baseUrl)
        .get(basePath + '/' + id)
        .end((err, res) => {
          if (err) { return done(err); }
          if (!res || !res.body) {
            return done(new Error('Response is expected but got none.'));
          }
          if (res.status !== 200) {
            return done(new Error(`Response status code 200 expected but got ${res.status}.`));
          }
          let body = res.body;
          if (body.id !== id) {
            return done(new Error(`Response body with id ${id} is expected but got ${body.id}.`));
          }
          done();
        });
    });
  });
  describe('Put one object by id', function () {
    let status = 'active';
    it('put one object by invalid id', done => {
      chai.request(baseUrl)
        .put(basePath + '/' + 'abc')
        .send({status: status})
        .end((err, res) => {
          if (err) { return done(err); }
          if (!res || !res.body) {
            return done(new Error('Response is expected but got none.'));
          }
          if (res.status !== 404) {
            return done(new Error(`Response status code 404 expected but got ${res.status}.`));
          }
          done();
        });
    });
    it('put one object by invalid input', done => {
      // our api does no have validation for it yet
      done();
    });
    it('put one valid object', done => {
      chai.request(baseUrl)
        .put(basePath + '/' + id)
        .send({status: status})
        .end((err, res) => {
          if (err) { return done(err); }
          if (!res || !res.body) {
            return done(new Error('Response is expected but got none.'));
          }
          if (res.status !== 200) {
            return done(new Error(`Response status code 200 expected but got ${res.status}.`));
          }
          let body = res.body;
          if (body.id !== id) {
            return done(new Error(`Response body with id ${id} is expected but got ${body.id}.`));
          }
          if (body.status !== status) {
            return done(new Error(`Response body is expected as updated object with status ${status}, but got status ${body.status}.`));
          }
          let extraKey = Object.keys(body).find(elem=>!['id','status'].includes(elem));
          if (extraKey) {
            return done(new Error(`Response body is expected as replaced object, but got extra key ${extraKey}.`));
          }
          done();
        });
    });
  });
  describe('Patch one object by id', function () {
    let desc = 'test desc';
    it('patch one object by invalid id', done => {
      chai.request(baseUrl)
        .patch(basePath + '/' + 'abc')
        .send({desc: desc})
        .end((err, res) => {
          if (err) { return done(err); }
          if (!res || !res.body) {
            return done(new Error('Response is expected but got none.'));
          }
          if (res.status !== 404) {
            return done(new Error(`Response status code 404 expected but got ${res.status}.`));
          }
          done();
        });
    });
    it('patch one object by invalid input', done => {
      // our api does no have validation for it yet
      done();
    });
    it('patch one valid object', done => {
      chai.request(baseUrl)
        .patch(basePath + '/' + id)
        .send({desc: desc})
        .end((err, res) => {
          if (err) { return done(err); }
          if (!res || !res.body) {
            return done(new Error('Response is expected but got none.'));
          }
          if (res.status !== 200) {
            return done(new Error(`Response status code 200 expected but got ${res.status}.`));
          }
          let body = res.body;
          if (body.id !== id) {
            return done(new Error(`Response body with id ${id} is expected but got ${body.id}.`));
          }
          if (body.desc !== desc) {
            return done(new Error(`Response body is expected as updated object with desc ${desc}, but got desc ${body.desc}.`));
          }
          if (Object.keys(body).every(elem=>['id','desc'].includes(elem))) {
            return done(new Error(`Response body is expected as updated object, but got only given key.`));
          }
          done();
        });
    });
  });
});
