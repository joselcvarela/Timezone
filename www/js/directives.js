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
.directive('resultTimezone', function() {
  return {
    scope: {},
    restrict: 'E',
    templateUrl: 'templates/resultTimezone.directive.html',
    controller: 'resultTimezoneCtrl'
  }
})
