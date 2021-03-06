'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db, callback) {
 db.createTable('tags', {
    id: {type: 'bigserial', primaryKey: true},
    name: {type: 'string', unique: true},
    created_at: 'date',
    last_updated_at: 'date'
  }, callback)
};

exports.down = function(db, callback) {
  db.dropTable('tags', callback());
};

exports._meta = {
  "version": 1
};
