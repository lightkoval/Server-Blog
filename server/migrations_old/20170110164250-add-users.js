var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.createTable('users', {
    id: { type: 'bigserial', primaryKey: true },
    name: {type: 'string', unique: true},
    email: {type: 'string', unique: true},
    about: 'text',
    register_date: 'date',
    role: 'string'
  }, callback);
};

exports.down = function(db, callback) {
  db.dropTable('users', callback);
};
