var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

exports.up = function (db, callback) {
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

exports.down = function (db, callback) {
    db.dropTable('posts', callback);
};
