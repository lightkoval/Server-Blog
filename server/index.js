/**
 * Created by svetlana on 10.01.2017.
 */
"use strict";
let express = require("express");
let bodyParser = require("body-parser");
let app = express();
let pg = require("pg");

let port = 8080;

let router = express.Router();
let dbConnectionString = "postgres://blogger:1@localhost:5432/blog";

/*Users request*/
router.post("/users", function (request, response) {
    pg.connect(dbConnectionString, function (err, client, done) {
        if (err) {
            response.sendStatus(500);
            return console.error("error fetching client from pool", err);
        }
        client.query("INSERT INTO users (name, email, about, register_date, role) VALUES ($1, $2, $3, NOW (), 'author') RETURNING *",
            [request.body.name, request.body.email, request.body.about], function (err, result) {
                done();
                if (err) {
                    response.sendStatus(500);
                    return console.error("error running query", err);
                } else {
                    response.json(result.rows[0]);
                }
        });
    });
});

router.get("/users", function (request, response) {
    pg.connect(dbConnectionString, function (err, client, done) {
        if (err) {
            response.sendStatus(500);
            return console.error("error fetching client from pool", err);
        }
        client.query("SELECT * FROM users", function (err, result) {
            done();
            if (err) {
                response.sendStatus(500);
                return console.error("error running query", err);
            } else {
                let data = toEditData(result.rows);
                response.json(data);
            }
        });
    });
});

router.get("/users/:id", function (request, response) {
    pg.connect(dbConnectionString, function (err, client, done) {
        if (err) {
            response.sendStatus(500);
            return console.error("error fetching client from pool", err);
        }
        client.query("SELECT * FROM users WHERE id=$1", [request.params.id], function (err, result) {
                done();
                if (err) {
                    response.sendStatus(500);
                    return console.error("error running query", err);
                } else {
                    let data = toEditData(result.rows);
                    response.json(data[0]);
                }
            });
    });
});

router.put("/users/:id", function (request, response) {
    pg.connect(dbConnectionString, function (err, client, done) {
        if (err) {
            response.sendStatus(500);
            return console.error("error fetching client from pool", err);
        }
        client.query("UPDATE users SET name=$1, email=$2, about=$3 WHERE id=$4 RETURNING *",
                     [request.body.name, request.body.email, request.body.about, request.params.id], function (err, result) {
            done();
            if (err) {
                response.sendStatus(500);
                return console.error("error running query", err);
            } else {
                let data = toEditData(result.rows);
                response.json(data[0]);
            }
        });
    });
});

router.delete("/users/:id", function (request, response) {
    pg.connect(dbConnectionString, function (err, client, done) {
        if (err) {
            response.sendStatus(500);
            return console.error("error fetching client from pool", err);
        }
        client.query("DELETE FROM users WHERE id = $1", [request.params.id], function (err, result) {
            done();
            if (err) {
                response.sendStatus(500);
                return console.error("error running query", err);
            } else {
                response.sendStatus(200);
            }
        });
    });
});

/*Posts request*/
router.post("/posts", function (request, response) {
    pg.connect(dbConnectionString, function (err, client, done) {
        if (err) {
            response.sendStatus(500);
            return console.error("error fetching client from pool", err);
        }
        client.query("INSERT INTO posts (title, body, author_id, date_post) VALUES ($1, $2, $3, NOW ()) RETURNING *",
            [request.body.title, request.body.body, request.body.authorId], function (err, result) {
                done();
                if (err) {
                    response.sendStatus(500);
                    return console.error("error running query", err);
                } else {
                    let data = toEditData(result.rows);
                    response.json(data[0]);
                }
            });
    });
});

router.get("/posts", function (request, response) {
    pg.connect(dbConnectionString, function (err, client, done) {
        if (err) {
            response.sendStatus(500);
            return console.error("error fetching client from pool", err);
        }
        client.query("SELECT users.name, posts.* FROM posts LEFT JOIN users on posts.author_id =users.id", function (err, result) {
            done();
            if (err) {
                response.sendStatus(500);
                return console.error("error running query", err);
            } else {
                let data = toEditData(result.rows);
                response.json(data);
            }
        });
    });
});

router.get("/posts/:id", function (request, response) {
    pg.connect(dbConnectionString, function (err, client, done) {
        if (err) {
            response.sendStatus(500);
            return console.error("error fetching client from pool", err);
        }
        client.query("SELECT posts.*, users.name  FROM posts LEFT JOIN users ON posts.author_id=users.id WHERE posts.id = $1",
            [request.params.id], function (err, result) {
            done();
            if (err) {
                response.sendStatus(500);
                return console.error("error running query", err);
            } else {
                let data = toEditData(result.rows);
                response.json(data[0]);
            }
        });
    });
});

router.put("/posts/:id", function (request, response) {
    pg.connect(dbConnectionString, function (err, client, done) {
        if (err) {
            response.sendStatus(500);
            return console.error("error fetching client from pool", err);
        }
        client.query("UPDATE posts SET title=$1, body=$2 WHERE id=$3 RETURNING *", [request.body.title, request.body.body, request.params.id], function (err, result) {
            done();
            if (err) {
                response.sendStatus(500);
                return console.error("error running query", err);
            } else {
                let data = toEditData(result.rows);
                response.json(data[0]);
            }
        });
    });
});

router.delete("/posts/:id", function (request, response) {
    pg.connect(dbConnectionString, function (err, client, done) {
        if (err) {
            response.sendStatus(500);
            return console.error("error fetching client from pool", err);
        }
        client.query("DELETE FROM posts WHERE id = $1", [request.params.id], function (err, result) {
            done();
            if (err) {
                response.sendStatus(500);
                return console.error("error running query", err);
            } else {
                response.sendStatus(200);
            }
        });
    });
});


/*Tags request*/
router.post("/tags", function (request, response) {
    pg.connect(dbConnectionString, function (err, client, done) {
        if (err) {
            response.sendStatus(500);
            return console.error("error fetching client from pool", err);
        }
        client.query("INSERT INTO tags (name, created_at) VALUES ($1, NOW()) RETURNING *",
            [request.body.name], function (err, result) {
                done();
                if (err) {
                    response.sendStatus(500);
                    return console.error("error running query", err);
                } else {
                    let data = toEditData(result.rows);
                    response.json(data[0]);
                }
            });
    });
});

router.get("/tags", function (request, response) {
    pg.connect(dbConnectionString, function (err, client, done) {
        if (err) {
            response.sendStatus(500);
            return console.error("error fetching client from pool", err);
        }
        client.query("SELECT * FROM tags", function (err, result) {
            done();
            if (err) {
                response.sendStatus(500);
                return console.error("error running query", err);
            } else {
                let data = toEditData(result.rows);
                response.json(data);
            }
        });
    });
});

router.put("/tags/:id", function (request, response) {
    pg.connect(dbConnectionString, function (err, client, done) {
        if (err) {
            response.sendStatus(500);
            return console.error("error fetching client from pool", err);
        }
        client.query("UPDATE tags SET name=$1, last_updated_at=now() WHERE id=$2 RETURNING *", [request.body.name, request.params.id], function (err, result) {
            done();
            if (err) {
                response.sendStatus(500);
                return console.error("error running query", err);
            } else {
                let data = toEditData(result.rows);
                response.json(data[0]);
            }
        });
    });
});

router.delete("/tags/:id", function (request, response) {
    pg.connect(dbConnectionString, function (err, client, done) {
        if (err) {
            response.sendStatus(500);
            return console.error("error fetching client from pool", err);
        }
        client.query("DELETE FROM tags WHERE id = $1", [request.params.id], function (err, result) {
            done();
            if (err) {
                response.sendStatus(500);
                return console.error("error running query", err);
            } else {
                response.sendStatus(200);
            }
        });
    });
});


/*Comments request*/
router.post("/comments", function (request, response) {
    pg.connect(dbConnectionString, function (err, client, done) {
        if (err) {
            response.sendStatus(500);
            return console.error("error fetching client from pool", err);
        }
        client.query("INSERT INTO comments (author_id, post_id, body, created_at, parent_id) VALUES ($1, $2, $3, NOW(), $4) RETURNING *",
            [request.body.authorId, request.body.postId, request.body.body, request.body.parentId], function (err, result) {
                done();
                if (err) {
                    response.sendStatus(500);
                    return console.error("error running query", err);
                } else {
                    let data = toEditData(result.rows);
                    response.json(data[0]);
                }
            });
    });
});

router.get("/comments/:id", function (request, response) {
    pg.connect(dbConnectionString, function (err, client, done) {
        if (err) {
            response.sendStatus(500);
            return console.error("error fetching client from pool", err);
        }
        client.query("SELECT comments.*, users.name  FROM comments LEFT JOIN users ON comments.author_id= users.id WHERE post_id=$1",
            [request.params.id], function (err, result) {
            done();
            if (err) {
                response.sendStatus(500);
                return console.error("error running query", err);
            } else {
                let data = toEditData(result.rows);
                response.json(data);
            }
        });
    });
});

router.get("/comments", function (request, response) {
    pg.connect(dbConnectionString, function (err, client, done) {
        if (err) {
            response.sendStatus(500);
            return console.error("error fetching client from pool", err);
        }
        client.query("SELECT comments.*, users.name  FROM comments LEFT JOIN users ON comments.author_id= users.id",
            function (err, result) {
            done();
            if (err) {
                response.sendStatus(500);
                return console.error("error running query", err);
            } else {
                let data = toEditData(result.rows);
                response.json(data);
            }
        });
    });
});

router.put("/comments/:id", function (request, response) {
    pg.connect(dbConnectionString, function (err, client, done) {
        if (err) {
            response.sendStatus(500);
            return console.error("error fetching client from pool", err);
        }
        client.query("UPDATE comments SET body=$1 WHERE id=$2 RETURNING *", [request.body.body, request.params.id], function (err, result) {
            done();
            if (err) {
                response.sendStatus(500);
                return console.error("error running query", err);
            } else {
                let data = toEditData(result.rows);
                response.json(data[0]);
            }
        });
    });
});

router.delete("/comments/:id", function (request, response) {
    pg.connect(dbConnectionString, function (err, client, done) {
        if (err) {
            response.sendStatus(500);
            return console.error("error fetching client from pool", err);
        }
        client.query("DELETE FROM comments WHERE id = $1", [request.params.id], function (err, result) {
            done();
            if (err) {
                response.sendStatus(500);
                return console.error("error running query", err);
            } else {
                response.sendStatus(200);
            }
        });
    });
});




app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/', express.static(__dirname + "/../client"));
app.use('/api', router);
app.listen(port);

console.log("listening port " + port + "...");



function toEditData(data) {
    if (!data.length) return [];
    let keys = toEditProperties(data);
    let  values = toSaveValues(data);
    return toMakeData(keys, values);
}

function toEditProperties(data) {
    return Object.keys(data[0])
        .map(key => key.split('_')
            .reduce((a, b) => a + b[0].toUpperCase() + b.slice(1)));
}

function toSaveValues(data) {
    return data.map(item => {
        let values = [];
        for(let key in item) {
            values.push(item[key]);
        }
        return values;
    });
}

function toMakeData(keys, arrays) {
    let result = [];

    arrays.forEach((arr) => {
        let obj = {};
        arr.forEach((item, i) => {
            let key = keys[i];
            obj[key] = item;
        });
        result.push(obj);
    });
    return result;
}
