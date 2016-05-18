angular.module('starter.directives', [])

.directive('cardTimezone', function() {
	return {
    scope: {
      offset: '=',
      timezone: '='
    },
		restrict: 'E',
		templateUrl: 'templates/cardTimezone.directive.html',
		controller: 'cardTimezoneCtrl'
	}
})

.directive('timezoneWrapper', function(MyTimezones){
  return {
    scope: {
      actual: '='
    },
    templateUrl: 'templates/timezoneWrapper.directive.html',
    controller: 'timezoneWrapperCtrl',
    controllerAs: 'vm',
    restrict: 'E'
  }
})
