var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

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
