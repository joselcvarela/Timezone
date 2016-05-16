 angular.module('starter.services', [])

.service('MyTimezones', function($http) {
  
  let vm = this;

  vm.mytz = [],
  vm.offsets = [];

  vm.url = '/data/timezones.json';

  $http.get(vm.url).then(function (resp) {
      vm.offsets = resp.data;
  }, function(err){
    console.log(err);
  });

  vm.searchOffset = function(_offsets, _utc){
    for(let offset of _offsets){
      if(offset.utc){
        for(let utc of offset.utc){
          if(utc && utc == _utc) {
            return offset.offset;
          }
        }
      }
    }
  }


  vm.add = function(tz) {
    // object: GMT, Job Schedule, ISO 3861 (PT,EN, FR ...)
    let offset = vm.searchOffset(vm.offsets, tz.timezone);
    tz.offset = offset;
    vm.mytz.push(tz);
    return tz;
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
