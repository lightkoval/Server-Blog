var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

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
