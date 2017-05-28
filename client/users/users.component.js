angular.module('users').component('users', {
        templateUrl: 'users/users.template.html',
        controller: ['$http', function UsersController($http) {
            var self = this;
            $http.get('api/users').then(function (response) {
                self.users = response.data;
            });

            self.userDelete = function userDelete(userId) {
                $http.delete('api/user/' + userId).then(function success(response) {

                });
            }
        }]
    }
);