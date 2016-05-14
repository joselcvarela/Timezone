angular.module('starter.controllers', [])

.controller('cardTimezoneCtrl', function($scope) {
})

.controller('ClocksCtrl', function($scope, $http, MyTimezones) {
  const vm = this;

  $http.post('//freegeoip.net/json/')
    .then(function(resp){$scope.countryModel = resp});

  vm.addTimezone = function(country, tz) {
    MyTimezones.add({country: country, timezone: tz});
    console.log(country, tz);
  }
})

.controller('ChatsCtrl', function($scope) {
})

.controller('ChatDetailCtrl', function($scope, $stateParams) {
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
