 angular.module('starter.services', [])

.service('MyTimezones', function($window, $rootScope, $http) {
  
  let vm = this;

  vm.mytz = [];
  vm.offsets = [];
  vm.initOffset = (new Date().getTimezoneOffset()) / 60;

  vm.url = '/data/timezones.json';

  $http.get(vm.url).then(function (resp) {
      vm.offsets = resp.data;
      vm.init();
  }, function(err){
    console.log(err);
  });

  vm.getRegionTimezone = function(offset){
    for(let obj of vm.offsets) {
      if(obj.offset == -offset){
        if(obj.utc){
          return obj.utc[0];
        }
      }
    }
  }

  vm.init = function() {
    let initRegion = vm.getRegionTimezone(vm.initOffset);
    let initTz = {
      timezone: initRegion,
      end: 18,
      start: 9,
      offset: vm.initOffset
    };
    vm.add(initTz);
  }

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

  vm.orderStates = function(states, offset) {
    offset += vm.initOffset;
    var ordStates = [];
    debugger;
    for (let i = 0; i <= 23; i++) {
      ordStates[vm.calculate(offset,i)] =  states[i];
    }
    return ordStates;
  }

  vm.calculate = function(gmt, i){
    if((i+gmt)<0) {
      return 24-(-gmt-i);
    } else if ((i+gmt)>23) {
      return gmt-(24-i);
    } else {
      return gmt+i;
    }
  }


  vm.add = function(tz) {
    // object: GMT, Job Schedule, ISO 3861 (PT,EN, FR ...)
    tz.states = vm.buildStates(tz.start, tz.end);
    let offset = vm.searchOffset(vm.offsets, tz.timezone);
    tz.offset = offset;
    tz.states = vm.orderStates(tz.states, offset);
    vm.mytz.push(tz);
    $rootScope.$emit('tzAddedEv',{});
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

  vm.buildStates = function(startTime, endTime, threshold=2){
    let states = [];
    for (var i = 0; i < 24; i++) {
      if(i >= startTime && i < endTime){
        states[i] = 'available';
      } else if(i >= endTime && i< endTime + threshold) {
        states[i] = 'overtime';
      } else {
        states[i] = 'unavailable';
      }
    }
    return states;
  }

});
