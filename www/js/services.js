 angular.module('starter.services', [])

.service('MyTimezones', function() {
  
  var vm = this;

  vm.mytz = [];

  vm.add = function(tz) {
    vm.mytz.push(tz);
  }

  vm.remove = function(tz) {
    var idx = vm.mytz.indexOf(tz);
    if(idx>=0) {
       vm.mytz.splice(idx, 1);
    }
  }

  vm.all = function() {
    return vm.mytz;
  }

});
