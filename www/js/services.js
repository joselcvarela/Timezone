 angular.module('starter.services', [])

.service('MyTimezones', function($window, $rootScope, $http) {
  
  let vm = this;

  vm.mytz = [];
  vm.offsets = [];
  vm.today = new Date();
  vm.myTimezone = {}
  vm.offsetByTimezone = offsetByTimezone;
  vm.calculate = calculate;
  vm.add = add;
  vm.remove = remove;
  vm.buildStates = buildStates;
  vm.hours = hours;
  vm.init = init;

  /*
  vm.url = '/data/timezones.json';

  $http.get(vm.url).then(function (resp) {
      vm.offsets = resp.data;
      vm.init();
  }, function(err){
    console.log(err);
  });*/

  function init() {
    let timezone = moment.tz.guess();
    let offset = vm.offsetByTimezone(timezone);
    let initTz = {
      timezone: timezone,
      end: 18,
      start: 9,
      offset: offset
    };
    vm.add(initTz);
  }

  /*vm.searchOffset = function(_offsets, _utc){
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
  
  function orderStates(states, offset) {
    let ordStates = [];
    for (let i = 0; i <= 23; i++) {
      let position = {
        hour: vm.calculate(offset,i),
        availability: states[i].availability
      };
      ordStates[i] = position;
    }

    return ordStates;
  }
  */

  function calculate(gmt, i){
    if((i+gmt)<0) {
      return 24-(-gmt-i);
    } else if ((i+gmt)>23.5) {
      return gmt-(24-i);
    } else {
      return gmt+i;
    }
  }

  function offsetByTimezone(timezone, time = vm.today.getTime()){
    return -moment.tz.zone(timezone).offset(time) / 60 ;
  }


  function add(tz) {
    // object: GMT, Job Schedule, ISO 3861 (PT,EN, FR ...)
    //let offset = vm.searchOffset(vm.offsets, tz.timezone);
    let offset = 0;
    if(!tz.offset){
      offset = vm.offsetByTimezone(tz.timezone);
      tz.offset = offset;
    }
    tz.states = vm.buildStates(tz.start, tz.end, tz.offset);
    vm.mytz.push(tz);
    $rootScope.$emit('tzAddedEv',{});
    return tz;
  }

  function remove(tz) {
    var idx = vm.mytz.indexOf(tz);
    if(idx>=0) {
       vm.mytz.splice(idx, 1);
    }
  }

  vm.all = function() {
    return vm.mytz;
  }

  function hours(idx, offset){
    //offset += vm.today.getTimezoneOffset()/60;
    let hour = vm.calculate(offset, idx);
    let minutes = (hour % 1) * 60;
    hour = (Math.floor(hour));
    return hour + ':' + minutes + ' - ' + (hour+1) + ':' +minutes; //idx + (vm.today.getTimezoneOffset() / 60) + offset;
  }

  function buildStates(startTime, endTime, offset=0, threshold=2){
    let states = [];
    for (var i = 0; i < 24; i++) {
      let myTime = vm.calculate(offset, i);
      let position = {};
      if(myTime >= startTime && myTime < endTime){
        position.availability = 'available';
      } else if(myTime >= endTime && myTime< endTime + threshold) {
        position.availability = 'overtime';
      } else {
        position.availability = 'unavailable';
      }
      position.hour = vm.calculate(i, offset);
      position.formattedHour = vm.hours(i, offset);
      states[i] = position;
    }
    return states;
  }

  vm.init();

});
