angular.module('starter.controllers', [])

.controller('cardTimezoneCtrl', function($scope) {
})

.controller('timezoneWrapperCtrl', function($scope, $location, MyTimezones) {
  const vm = this;
  vm.setClass = setClass;
  vm.today = new Date();
  vm.hours = hours;

  $location.hash('anc'+vm.today.getHours());

  function setClass(state, index){
    let cssClass = ['bar'];
    switch(state){
      case 'available':
        cssClass.push('bar-balanced');
      break;
      case 'overtime':
        cssClass.push('bar-energized');
      break;
      case 'unavailable':
        cssClass.push('bar-assertive');
      break;
    }
    if(vm.today.getHours() == index){
      cssClass.push('activeHour');
    }
    return cssClass;
  }

  function hours(idx, offset){
    offset += vm.today.getTimezoneOffset()/60;
    let hour = MyTimezones.calculate(offset, idx);
    return hour + '-' + (hour+1); //idx + (vm.today.getTimezoneOffset() / 60) + offset;
  }

})

.controller('ResultsCtrl', function($rootScope, $scope, MyTimezones) {
  const vm = this;
  vm.timezones = MyTimezones.all();
  vm.divisor = 100 / vm.timezones.length;
  $rootScope.$on('tzAddedEv', function(ev, data){
    vm.timezones = MyTimezones.all();
    vm.divisor = 100 / vm.timezones.length;
  })
})

.controller('ClocksCtrl', function($scope, MyTimezones) {
  const vm = this;

  $scope.startTime = 9;
  $scope.endTime = 18;
  $scope.slider = {
    startTime: 9,
    endTime: 18,
    options: {
      floor: 0,
      ceil: 23,
      step: 0.5
    }
  }


  vm.allClocks = function() {
    return MyTimezones.all();
  }

  vm.addTimezone = function(tz, startTime, endTime) {
    MyTimezones.add({
      timezone: tz,
      start: startTime,
      end: endTime
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
