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
  db.all('ALTER TABLE posts ALTER COLUMN date_post TYPE TIMESTAMP', callback);
};

exports.down = function(db, callback) {
  return db.dropTable('posts', callback);
};

exports._meta = {
  "version": 1
};
