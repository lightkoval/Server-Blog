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
    db.createTable('posts', {
        id: {type: 'bigserial', primaryKey: true},
        title: 'string',
        body: 'text',
        author_id: {
            type: 'bigint', foreingKey: {
                name: 'posts_users_id_fk',
                table: 'user',
                rules: {
                    onDelete: 'CASCADE',
                    onUpdate: 'RESTRICT'
                },
                mapping: 'id'
            }
        },
        date_post: 'date'
    }, callback );

};

exports.down = function(db, callback) {
    db.dropTable('posts', callback);
};


exports._meta = {
  "version": 1
};
