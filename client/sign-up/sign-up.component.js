angular.
    module('signUp').
    component('signUp', {
        templateUrl: 'sign-up/sign-up.template.html',
        controller: ['$http', function SignUpController ($http) {
            var self = this;
            self.submit = function (user) {
                $http.post('api/user', user).then(function (response) {

                });
            };
            self.reset = function reset () {
                self.user = null;
            }
        }]
    }
);