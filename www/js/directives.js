angular.module('starter.directives', [])

.directive('cardTimezone', function() {
	return {
		restrict: 'E',
		templateUrl: 'templates/cardTimezone.directive.html',
		controller: 'cardTimezoneCtrl'
	}
})