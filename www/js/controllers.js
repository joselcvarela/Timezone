angular.module('starter.controllers', [])

.controller('cardTimezoneCtrl', function($scope) {
})

.controller('ClocksCtrl', function($scope, MyTimezones) {
  const vm = this;

  $scope.startTime = 9;
  $scope.endTime = 18;


  vm.allClocks = function() {
    return MyTimezones.all();
  }

  vm.addTimezone = function(country, tz, startTime, endTime) {
    let coiso = MyTimezones.add({country: country, timezone: tz, start: startTime, end: endTime});
    console.log(coiso);
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
