'use strict';

angular.module('post').component('post', {
    templateUrl: 'post/post.template.html',
    controller: ['$http', '$routeParams', '$location', function PostController ($http, $routeParams, $location) {
        var self = this;

        $http.get('api/post/' + $routeParams.id).then(function success (response) {
            self.post = response.data;
        });

        self.submit = function submit (post) {
            $http.put('api/post/' + $routeParams.id, post).then(function success (response) {
                self.post = response.data;
            })
        };

        self.deletePost = function deletePost () {
            $http.delete('api/post/' + $routeParams.id).then(function success (response) {
                $location.path('/posts');
            });
        }

    }]
});