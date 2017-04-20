(() => {
    angular
        .module('app')
        .config(config);

    config.$inject = ['$locationProvider', '$routeProvider', '$mdThemingProvider', '$mdIconProvider'];
    function config($locationProvider, $routeProvider, $mdThemingProvider, $mdIconProvider) {
        $routeProvider
            .when('/', {
                redirectTo: '/starships'
            })
            .otherwise({
                redirectTo: '/404'
            });

        $locationProvider
            .html5Mode({
                enabled: true,
                requireBase: false
            })
            .hashPrefix('');

        // material design configs
        $mdThemingProvider.theme('default')
            .primaryPalette('blue')
            .accentPalette('deep-orange');

        $mdIconProvider.defaultIconSet('../icons/traxion-icons.svg?v=0.1', 24);
    }
})();