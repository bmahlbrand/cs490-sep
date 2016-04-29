angular.module('pixelTone').controller('loginController',
  ['$scope', '$location', 'AuthService',
  function ($scope, $location, AuthService) {

    $scope.login = function () {

      // initial values
      $scope.error = false;
      $scope.disabled = true;

      // call login from service
      AuthService.login($scope.loginForm.username, $scope.loginForm.password)
        // handle success
        .then(function () {
          $location.path('/');
          $scope.disabled = false;
          $scope.loginForm = {};
        })
        // handle error
        .catch(function () {
          $scope.error = true;
          $scope.errorMessage = "Invalid username and/or password";
          $scope.disabled = false;
          $scope.loginForm = {};
        });

    };

    $scope.resetPass = function () {
      // initial values
      $scope.messageEmail = false;
      $scope.disabled = true;

      // call reset from service
      AuthService.resetPassword($scope.passReset.email)
        // handle success
        .then(function () {
          $location.path('/');
          $scope.disabled = false;
          $scope.passReset = {};
        })
        // handle error
        .catch(function () {
          $scope.errorEmail = true;
          
          $scope.disabled = false;
          $scope.passReset = {};
        });

        $scope.inputEmail = true;
        $scope.disabled = false;
        $scope.messageEmail = "Sent Email with instructions to: "+$scope.passReset.email;
        $scope.passReset = {};
        $('#passReset').modal('hide');
    };

}]);






/*angular.module("pixelTone")
    .controller('loginController', ['$scope', '$http', '$httpParamSerializerJQLike', function ($scope, $http, $httpParamSerializerJQLike) {

        $scope.user = {};
        $scope.cuser = {};

        $scope.loginFunction = function () {

            $http({
                method: 'POST',
                url: '/login',
                data: $httpParamSerializerJQLike({ 'email': $scope.user.email, 'password': $scope.user.password }),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).success(function () {
                alert("Login Success");
            }).error(function () {
                alert("Login Failure");
            });
        }

        $scope.signUpFunction = function () {

            $http({
                method: 'POST',
                url: '/signup',
                data: $httpParamSerializerJQLike({ 'email': $scope.cuser.email, 'password': $scope.cuser.password }),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).success(function () {
                alert("Create User Success");
            }).error(function () {
                alert("Create User Failure");
            });
        }
    }]);*/