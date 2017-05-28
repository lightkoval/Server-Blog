'use strict';

angular.module('posts').component('posts', {
    templateUrl: 'posts/posts.template.html',
    controller: ['$http', function PostsController ($http) {
        var self = this;
        $http.get('api/posts').then(function success (response) {
            self.posts = response.data;
        })
    }]

});

/*--SELECT * FROM posts INNER JOIN users ON posts.author_id=users.id;*/