const low = require('lowdb');
const lodashId = require('lodash-id');
const FileSync = require('lowdb/adapters/Filesync');
const adapter = new FileSync('./db.json');
const db = low(adapter);
db._.mixin(lodashId);

module.exports = db;