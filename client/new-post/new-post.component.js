'use strict';
angular.module('newPost').component('newPost', {
    templateUrl: 'new-post/new-post.template.html',
    controller: ['$http', function NewPostController ($http) {
        var self = this;
        self.submit = function submit (post) {
            $http.post('api/post', post).then(function success (response) {
                self.post = response.data;
            })
        }
    }]
});