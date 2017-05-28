 angular.module('user').component('user', {
    templateUrl: 'user/user.template.html',
    controller: ['$http', '$routeParams', function UserController($http, $routeParams) {
        var self = this;
        $http.get('api/user/' + $routeParams.userId).then(function success(response) {
            self.user = response.data;
        });

        self.updateUser = function updateUser (user) {
           $http.put('api/user/' + $routeParams.userId, user).then(function success (response) {
               self.user = response.data;
           })
        }
    }]
});
