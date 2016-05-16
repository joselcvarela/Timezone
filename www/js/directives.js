angular.module('starter.directives', [])

.directive('cardTimezone', function() {
	return {
    scope: {
      offset: '='
    },
		restrict: 'E',
		templateUrl: 'templates/cardTimezone.directive.html',
		controller: 'cardTimezoneCtrl'
	}
})
