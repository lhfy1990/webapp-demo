
const express = require('express');

const db = require('../../db');
const DB = {
  objects: db.get('objects')
};

let router = express.Router();

router.route('/')
  .get(function (req, res) {
    // query: /api/objects/?property=textValue&propertyarray=textValue0&propertyarray=textValue1
    let query = req.query;
    // if (query.isInvalid) 400 BAD REQUEST
    // if (isNoAuthIntormation) 401 UNAUTHORIZED
    // if (isNoRights) 403 FORBIDDEN
    let objects = DB.objects.filter(query).value();
    let packet = {
      offset: 0,
      count: objects.length,
      data: objects
    };
    let statusCode = 200; // 200 OK, no matter result is empty or not
    res.status(statusCode);
    res.json(packet);
  })
  .post(function (req, res) {
    let body = req.body;
    // if (body.isInvalid) 400 BAD REQUEST
    // if (isNoAuthIntormation) 401 UNAUTHORIZED
    // if (isNoRights) 403 FORBIDDEN
    // if (body.isConflict) 409 CONFLICT
    let object = DB.objects.insert(body);
    let statusCode = 201; // 201 CREATED
    res.status(statusCode);
    res.json(object); // or requrn object identifier
  })
  .put(function (req, res) {
    // not allowed, unless you want to update/replace every resource in the entire collection
    let statusCode = 405; // 405 METHOD NOT ALLOWED
    res.status(statusCode);
    res.json();
  })
  .patch(function (req, res) {
    // not allowed, unless you want to update/modify every resource in the entire collection
    let statusCode = 405; // 405 METHOD NOT ALLOWED
    res.status(statusCode);
    res.json();
  })
  .delete(function (req, res) {
    // not allowed, unless you want to delete the whole collection—not often desirable
    let statusCode = 405; // 405 METHOD NOT ALLOWED
    res.status(statusCode);
    res.json();
  });
router.route('/:id')
  .get(function (req, res) {
    let id = req.params.id;
    // if (isNoAuthIntormation) 401 UNAUTHORIZED
    // if (isNoRights) 403 FORBIDDEN
    let object = DB.objects.find({ id: id }).value();
    // 404 NOT FOUND
    if (!object) { return res.status(404).end(); }
    let statusCode = 200; // 200 OK
    res.status(statusCode);
    res.json(object);
  })
  .post(function (req, res) {
    // not allowed
    let statusCode = 405; // 405 METHOD NOT ALLOWED
    res.status(statusCode);
    res.json();
  })
  .put(function (req, res) {
    let id = req.params.id;
    let body = req.body;
    // if (body.isInvalid) 400 BAD REQUEST
    // if (isNoAuthIntormation) 401 UNAUTHORIZED
    // if (isNoRights) 403 FORBIDDEN
    let object = DB.objects.find({ id: id }).value();
    // 404 NOT FOUND
    if (!object) { return res.status(404).end(); }
    body.id = id;
    DB.objects.remove({ id: id }).write();
    DB.objects.push(body).write();
    object = DB.objects.find({ id: id }).value();
    let statusCode = 200; // 200 OK, indicating the object has been replaced by entire object.
    res.status(statusCode);
    res.json(object);
  })
  .patch(function (req, res) {
    let id = req.params.id;
    let body = req.body;
    // if (body.isInvalid) 400 BAD REQUEST
    // if (isNoAuthIntormation) 401 UNAUTHORIZED
    // if (isNoRights) 403 FORBIDDEN
    let object = DB.objects.find({ id: id }).value();
    // 404 NOT FOUND
    if (!object) { return res.status(404).end(); }
    DB.objects.find({ id: id }).assign(body).write();
    object = DB.objects.find({ id: id }).value();
    let statusCode = 200; // 200 OK, indicating the object has been modified on specific properties.
    res.status(statusCode);
    res.json(object);
  })
  .delete(function (req, res) {
    let id = req.params.id;
    // if (isNoAuthIntormation) 401 UNAUTHORIZED
    // if (isNoRights) 403 FORBIDDEN
    let object = DB.objects.find({ id: id }).value();
    // 404 NOT FOUND
    if (!object) { return res.status(404).end(); }
    DB.objects.remove({ id: id }).write();
    let statusCode = 204; // 204 NO CONTENT, indicating the object has been deleted.
    res.status(statusCode);
    res.json();
  });

module.exports = router;
