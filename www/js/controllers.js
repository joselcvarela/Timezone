angular.module('starter.controllers', [])

.controller('cardTimezoneCtrl', function($scope) {
})

.controller('ResultsCtrl', function($rootScope, $scope, MyTimezones) {
  let vm = this;
  vm.timezones = [];
  $rootScope.$on('mytzEv', function(ev, tzs){
    debugger;
    vm.timezones = tzs;
  })
})

.controller('resultTimezoneCtrl', function($rootScope, $scope, MyTimezones) {

})

.controller('ClocksCtrl', function($scope, MyTimezones) {
  const vm = this;

  $scope.startTime = 9;
  $scope.endTime = 18;


  vm.allClocks = function() {
    return MyTimezones.all();
  }

  vm.buildStates = function(startTime, endTime, threshold=2){
    let states = [];
    for (var i = 0; i < 24; i++) {
      if(i >= startTime && i < endTime){
        states[i] = 'P';
      } else if(i >= endTime && i< endTime + threshold) {
        states[i] = 'O';
      } else {
        states[i] = 'B';
      }
    }
    return states;
  }

  vm.addTimezone = function(country, tz, startTime, endTime) {
    MyTimezones.add({
      country: country,
      timezone: tz,
      start: startTime,
      end: endTime,
      states: vm.buildStates(startTime, endTime)
    });
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams) {
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
