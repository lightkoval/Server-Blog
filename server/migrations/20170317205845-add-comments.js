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
db.createTable('comments', {
    id: {type: 'bigserial', primaryKey: true},
    author_id: {type: 'bigint', foreignKey: {
      name: 'comments_users_id_fk',
      table: 'users',
      rules: {
        onDelete: 'CASCADE',
        onUpdate: 'RESTRICT'
      },
      mapping: 'id'
    }},
    post_id: {type: 'bigint', foreignKey: {
      name: 'comments_posts_id_fk',
      table: 'posts',
      rules: {
        onDelete: 'CASCADE',
        onUpdate: 'RESTRICT'
      },
      mapping: 'id'
    }},
    body: 'text',
    created_at: 'date',
  }, callback);
};

exports.down = function(db, callback) {
    db.dropTable('comments', callback);

};

exports._meta = {
  "version": 1
};
