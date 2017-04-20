(() => {
    angular.module('app', ['ngAnimate', 'ngMessages', 'ngRoute', 'ngMaterial', 'ne.swapi', 'app.starships']);
})();
(() => {
    angular.module('app.starships', ['app.starships.addDialog']);
})();
(() => {
    angular.module('app.starships.addDialog', []);
})();
(() => {
    angular.module('app').config(config);

    config.$inject = ['$locationProvider', '$routeProvider', '$mdThemingProvider', '$mdIconProvider'];
    function config($locationProvider, $routeProvider, $mdThemingProvider, $mdIconProvider) {
        $routeProvider.when('/', {
            redirectTo: '/starships'
        }).otherwise({
            redirectTo: '/404'
        });

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        }).hashPrefix('');

        // material design configs
        $mdThemingProvider.theme('default').primaryPalette('blue').accentPalette('deep-orange');

        $mdIconProvider.defaultIconSet('../icons/traxion-icons.svg?v=0.1', 24);
    }
})();
(() => {
    let starshipsComponent = {
        controller: starshipsController,
        templateUrl: 'templates/starships.html'
    };

    angular.module('app.starships').component('starships', starshipsComponent);

    starshipsController.$inject = ['swapi', '$mdDialog', '$mdToast'];
    function starshipsController(swapi, $mdDialog, $mdToast) {
        let ctrl = this;
        ctrl.$onInit = () => {
            ctrl.openStarship = null;
            ctrl.loading = true;
            ctrl.searching = false;
            ctrl.starshipSearch = {
                $: ''
            };

            ctrl.addStarship = addStarship;
            ctrl.compileIdenticon = compileIdenticon;
            ctrl.closeDetails = closeDetails;
            ctrl.openDetails = openDetails;
            ctrl.closeSearch = closeSearch;
            ctrl.openSearch = openSearch;

            activate();
        };

        // functions
        function activate() {
            activateStarships();
        }
        function activateStarships() {
            swapi.starships.all().then(starships => {
                ctrl.starships = starships.results;
                ctrl.loading = false;
            });
        }

        function addStarship(searchCount, ev) {
            $mdDialog.show({
                controller: 'addStarshipController as $ctrl',
                templateUrl: 'templates/add-starship.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                bindToController: true,
                locals: {
                    name: searchCount === 0 ? ctrl.starshipSearch.$ : null
                }
            }).then(starship => {
                ctrl.starships.push(starship);
                $mdToast.show($mdToast.simple().textContent(`${starship.name} starship added to directory.`).position('bottom left').hideDelay(3000));
            }, () => {
                console.log('Cancelled Dialog');
            });
        }

        function compileIdenticon(starship) {
            let options = {
                foreground: [255, 255, 255, 255],
                background: [0, 0, 0, 221],
                margin: 0.2,
                size: 128,
                format: 'png'
            };
            return new Identicon(hashString(starship.name), options).toString();
        }

        function hashString(str) {
            let hash = 0;
            if (str.length == 0) return hash;
            for (let i = 0; i < str.length; i++) {
                let char = str.charCodeAt(i);
                hash = (hash << 5) - hash + char;
            }
            return hash.toString();
        }

        function closeDetails() {
            ctrl.openStarship = null;
        }

        function openDetails(starship) {
            ctrl.openStarship = starship;
        }

        function closeSearch() {
            ctrl.starshipSearch.$ = '';
            ctrl.searching = false;
        }

        function openSearch() {
            ctrl.searching = true;
        }
    }
})();
(() => {
    angular.module('app.starships').config(starshipsConfig);

    starshipsConfig.$inject = ['$routeProvider'];
    function starshipsConfig($routeProvider) {
        $routeProvider.when('/starships', {
            title: 'Starships',
            template: '<starships class="frame"></starships>'
        });
    }
})();
(() => {
    angular.module('app.starships.addDialog').controller('addStarshipController', addStarshipController);

    addStarshipController.$inject = ['$mdDialog'];
    function addStarshipController($mdDialog) {
        let ctrl = this;
        ctrl.starship = {
            name: ctrl.name === null ? '' : ctrl.name,
            manufacturer: '',
            model: ''
        };

        // methods
        ctrl.cancelAdd = cancelAdd;
        ctrl.submitForm = submitForm;

        function cancelAdd() {
            $mdDialog.cancel();
        }

        function submitForm(form) {
            if (form.$valid === true) {
                $mdDialog.hide(ctrl.starship);
            } else {
                form.name.$setTouched();
                form.manufacturer.$setTouched();
                form.model.$setTouched();
            }
        }
    }
})();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIl9hcHAubW9kdWxlLmpzIiwic3RhcnNoaXBzL19zdGFyc2hpcHMubW9kdWxlLmpzIiwic3RhcnNoaXBzL2FkZC1zdGFyc2hpcC9fYWRkLXN0YXJzaGlwLm1vZHVsZS5qcyIsImFwcC5jb25maWcuanMiLCJzdGFyc2hpcHMvc3RhcnNoaXBzLmNvbXBvbmVudC5qcyIsInN0YXJzaGlwcy9zdGFyc2hpcHMuY29uZmlnLmpzIiwic3RhcnNoaXBzL2FkZC1zdGFyc2hpcC9hZGQtc3RhcnNoaXAuY29udHJvbGxlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUNGQTtBQUNBO0FBQ0E7QUNGQTtBQUNBO0FBQ0E7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDakdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoKCkgPT4ge1xuICAgIGFuZ3VsYXIubW9kdWxlKCdhcHAnLCBbJ25nQW5pbWF0ZScsICduZ01lc3NhZ2VzJywgJ25nUm91dGUnLCAnbmdNYXRlcmlhbCcsICduZS5zd2FwaScsICdhcHAuc3RhcnNoaXBzJ10pO1xufSkoKTsiLCIoKCkgPT4ge1xuICAgIGFuZ3VsYXIubW9kdWxlKCdhcHAuc3RhcnNoaXBzJywgWydhcHAuc3RhcnNoaXBzLmFkZERpYWxvZyddKTtcbn0pKCk7IiwiKCgpID0+IHtcbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwLnN0YXJzaGlwcy5hZGREaWFsb2cnLCBbXSk7XG59KSgpOyIsIigoKSA9PiB7XG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcCcpLmNvbmZpZyhjb25maWcpO1xuXG4gICAgY29uZmlnLiRpbmplY3QgPSBbJyRsb2NhdGlvblByb3ZpZGVyJywgJyRyb3V0ZVByb3ZpZGVyJywgJyRtZFRoZW1pbmdQcm92aWRlcicsICckbWRJY29uUHJvdmlkZXInXTtcbiAgICBmdW5jdGlvbiBjb25maWcoJGxvY2F0aW9uUHJvdmlkZXIsICRyb3V0ZVByb3ZpZGVyLCAkbWRUaGVtaW5nUHJvdmlkZXIsICRtZEljb25Qcm92aWRlcikge1xuICAgICAgICAkcm91dGVQcm92aWRlci53aGVuKCcvJywge1xuICAgICAgICAgICAgcmVkaXJlY3RUbzogJy9zdGFyc2hpcHMnXG4gICAgICAgIH0pLm90aGVyd2lzZSh7XG4gICAgICAgICAgICByZWRpcmVjdFRvOiAnLzQwNCdcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJGxvY2F0aW9uUHJvdmlkZXIuaHRtbDVNb2RlKHtcbiAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgICAgICAgICByZXF1aXJlQmFzZTogZmFsc2VcbiAgICAgICAgfSkuaGFzaFByZWZpeCgnJyk7XG5cbiAgICAgICAgLy8gbWF0ZXJpYWwgZGVzaWduIGNvbmZpZ3NcbiAgICAgICAgJG1kVGhlbWluZ1Byb3ZpZGVyLnRoZW1lKCdkZWZhdWx0JykucHJpbWFyeVBhbGV0dGUoJ2JsdWUnKS5hY2NlbnRQYWxldHRlKCdkZWVwLW9yYW5nZScpO1xuXG4gICAgICAgICRtZEljb25Qcm92aWRlci5kZWZhdWx0SWNvblNldCgnLi4vaWNvbnMvdHJheGlvbi1pY29ucy5zdmc/dj0wLjEnLCAyNCk7XG4gICAgfVxufSkoKTsiLCIoKCkgPT4ge1xuICAgIGxldCBzdGFyc2hpcHNDb21wb25lbnQgPSB7XG4gICAgICAgIGNvbnRyb2xsZXI6IHN0YXJzaGlwc0NvbnRyb2xsZXIsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAndGVtcGxhdGVzL3N0YXJzaGlwcy5odG1sJ1xuICAgIH07XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwLnN0YXJzaGlwcycpLmNvbXBvbmVudCgnc3RhcnNoaXBzJywgc3RhcnNoaXBzQ29tcG9uZW50KTtcblxuICAgIHN0YXJzaGlwc0NvbnRyb2xsZXIuJGluamVjdCA9IFsnc3dhcGknLCAnJG1kRGlhbG9nJywgJyRtZFRvYXN0J107XG4gICAgZnVuY3Rpb24gc3RhcnNoaXBzQ29udHJvbGxlcihzd2FwaSwgJG1kRGlhbG9nLCAkbWRUb2FzdCkge1xuICAgICAgICBsZXQgY3RybCA9IHRoaXM7XG4gICAgICAgIGN0cmwuJG9uSW5pdCA9ICgpID0+IHtcbiAgICAgICAgICAgIGN0cmwub3BlblN0YXJzaGlwID0gbnVsbDtcbiAgICAgICAgICAgIGN0cmwubG9hZGluZyA9IHRydWU7XG4gICAgICAgICAgICBjdHJsLnNlYXJjaGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgY3RybC5zdGFyc2hpcFNlYXJjaCA9IHtcbiAgICAgICAgICAgICAgICAkOiAnJ1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgY3RybC5hZGRTdGFyc2hpcCA9IGFkZFN0YXJzaGlwO1xuICAgICAgICAgICAgY3RybC5jb21waWxlSWRlbnRpY29uID0gY29tcGlsZUlkZW50aWNvbjtcbiAgICAgICAgICAgIGN0cmwuY2xvc2VEZXRhaWxzID0gY2xvc2VEZXRhaWxzO1xuICAgICAgICAgICAgY3RybC5vcGVuRGV0YWlscyA9IG9wZW5EZXRhaWxzO1xuICAgICAgICAgICAgY3RybC5jbG9zZVNlYXJjaCA9IGNsb3NlU2VhcmNoO1xuICAgICAgICAgICAgY3RybC5vcGVuU2VhcmNoID0gb3BlblNlYXJjaDtcblxuICAgICAgICAgICAgYWN0aXZhdGUoKTtcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBmdW5jdGlvbnNcbiAgICAgICAgZnVuY3Rpb24gYWN0aXZhdGUoKSB7XG4gICAgICAgICAgICBhY3RpdmF0ZVN0YXJzaGlwcygpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGFjdGl2YXRlU3RhcnNoaXBzKCkge1xuICAgICAgICAgICAgc3dhcGkuc3RhcnNoaXBzLmFsbCgpLnRoZW4oc3RhcnNoaXBzID0+IHtcbiAgICAgICAgICAgICAgICBjdHJsLnN0YXJzaGlwcyA9IHN0YXJzaGlwcy5yZXN1bHRzO1xuICAgICAgICAgICAgICAgIGN0cmwubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBhZGRTdGFyc2hpcChzZWFyY2hDb3VudCwgZXYpIHtcbiAgICAgICAgICAgICRtZERpYWxvZy5zaG93KHtcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnYWRkU3RhcnNoaXBDb250cm9sbGVyIGFzICRjdHJsJyxcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3RlbXBsYXRlcy9hZGQtc3RhcnNoaXAuaHRtbCcsXG4gICAgICAgICAgICAgICAgcGFyZW50OiBhbmd1bGFyLmVsZW1lbnQoZG9jdW1lbnQuYm9keSksXG4gICAgICAgICAgICAgICAgdGFyZ2V0RXZlbnQ6IGV2LFxuICAgICAgICAgICAgICAgIGNsaWNrT3V0c2lkZVRvQ2xvc2U6IHRydWUsXG4gICAgICAgICAgICAgICAgYmluZFRvQ29udHJvbGxlcjogdHJ1ZSxcbiAgICAgICAgICAgICAgICBsb2NhbHM6IHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogc2VhcmNoQ291bnQgPT09IDAgPyBjdHJsLnN0YXJzaGlwU2VhcmNoLiQgOiBudWxsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkudGhlbihzdGFyc2hpcCA9PiB7XG4gICAgICAgICAgICAgICAgY3RybC5zdGFyc2hpcHMucHVzaChzdGFyc2hpcCk7XG4gICAgICAgICAgICAgICAgJG1kVG9hc3Quc2hvdygkbWRUb2FzdC5zaW1wbGUoKS50ZXh0Q29udGVudChgJHtzdGFyc2hpcC5uYW1lfSBzdGFyc2hpcCBhZGRlZCB0byBkaXJlY3RvcnkuYCkucG9zaXRpb24oJ2JvdHRvbSBsZWZ0JykuaGlkZURlbGF5KDMwMDApKTtcbiAgICAgICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnQ2FuY2VsbGVkIERpYWxvZycpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBjb21waWxlSWRlbnRpY29uKHN0YXJzaGlwKSB7XG4gICAgICAgICAgICBsZXQgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgICAgICBmb3JlZ3JvdW5kOiBbMjU1LCAyNTUsIDI1NSwgMjU1XSxcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiBbMCwgMCwgMCwgMjIxXSxcbiAgICAgICAgICAgICAgICBtYXJnaW46IDAuMixcbiAgICAgICAgICAgICAgICBzaXplOiAxMjgsXG4gICAgICAgICAgICAgICAgZm9ybWF0OiAncG5nJ1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJldHVybiBuZXcgSWRlbnRpY29uKGhhc2hTdHJpbmcoc3RhcnNoaXAubmFtZSksIG9wdGlvbnMpLnRvU3RyaW5nKCk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBoYXNoU3RyaW5nKHN0cikge1xuICAgICAgICAgICAgbGV0IGhhc2ggPSAwO1xuICAgICAgICAgICAgaWYgKHN0ci5sZW5ndGggPT0gMCkgcmV0dXJuIGhhc2g7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCBjaGFyID0gc3RyLmNoYXJDb2RlQXQoaSk7XG4gICAgICAgICAgICAgICAgaGFzaCA9IChoYXNoIDw8IDUpIC0gaGFzaCArIGNoYXI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gaGFzaC50b1N0cmluZygpO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gY2xvc2VEZXRhaWxzKCkge1xuICAgICAgICAgICAgY3RybC5vcGVuU3RhcnNoaXAgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gb3BlbkRldGFpbHMoc3RhcnNoaXApIHtcbiAgICAgICAgICAgIGN0cmwub3BlblN0YXJzaGlwID0gc3RhcnNoaXA7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBjbG9zZVNlYXJjaCgpIHtcbiAgICAgICAgICAgIGN0cmwuc3RhcnNoaXBTZWFyY2guJCA9ICcnO1xuICAgICAgICAgICAgY3RybC5zZWFyY2hpbmcgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIG9wZW5TZWFyY2goKSB7XG4gICAgICAgICAgICBjdHJsLnNlYXJjaGluZyA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG59KSgpOyIsIigoKSA9PiB7XG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcC5zdGFyc2hpcHMnKS5jb25maWcoc3RhcnNoaXBzQ29uZmlnKTtcblxuICAgIHN0YXJzaGlwc0NvbmZpZy4kaW5qZWN0ID0gWyckcm91dGVQcm92aWRlciddO1xuICAgIGZ1bmN0aW9uIHN0YXJzaGlwc0NvbmZpZygkcm91dGVQcm92aWRlcikge1xuICAgICAgICAkcm91dGVQcm92aWRlci53aGVuKCcvc3RhcnNoaXBzJywge1xuICAgICAgICAgICAgdGl0bGU6ICdTdGFyc2hpcHMnLFxuICAgICAgICAgICAgdGVtcGxhdGU6ICc8c3RhcnNoaXBzIGNsYXNzPVwiZnJhbWVcIj48L3N0YXJzaGlwcz4nXG4gICAgICAgIH0pO1xuICAgIH1cbn0pKCk7IiwiKCgpID0+IHtcbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwLnN0YXJzaGlwcy5hZGREaWFsb2cnKS5jb250cm9sbGVyKCdhZGRTdGFyc2hpcENvbnRyb2xsZXInLCBhZGRTdGFyc2hpcENvbnRyb2xsZXIpO1xuXG4gICAgYWRkU3RhcnNoaXBDb250cm9sbGVyLiRpbmplY3QgPSBbJyRtZERpYWxvZyddO1xuICAgIGZ1bmN0aW9uIGFkZFN0YXJzaGlwQ29udHJvbGxlcigkbWREaWFsb2cpIHtcbiAgICAgICAgbGV0IGN0cmwgPSB0aGlzO1xuICAgICAgICBjdHJsLnN0YXJzaGlwID0ge1xuICAgICAgICAgICAgbmFtZTogY3RybC5uYW1lID09PSBudWxsID8gJycgOiBjdHJsLm5hbWUsXG4gICAgICAgICAgICBtYW51ZmFjdHVyZXI6ICcnLFxuICAgICAgICAgICAgbW9kZWw6ICcnXG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gbWV0aG9kc1xuICAgICAgICBjdHJsLmNhbmNlbEFkZCA9IGNhbmNlbEFkZDtcbiAgICAgICAgY3RybC5zdWJtaXRGb3JtID0gc3VibWl0Rm9ybTtcblxuICAgICAgICBmdW5jdGlvbiBjYW5jZWxBZGQoKSB7XG4gICAgICAgICAgICAkbWREaWFsb2cuY2FuY2VsKCk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBzdWJtaXRGb3JtKGZvcm0pIHtcbiAgICAgICAgICAgIGlmIChmb3JtLiR2YWxpZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICRtZERpYWxvZy5oaWRlKGN0cmwuc3RhcnNoaXApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBmb3JtLm5hbWUuJHNldFRvdWNoZWQoKTtcbiAgICAgICAgICAgICAgICBmb3JtLm1hbnVmYWN0dXJlci4kc2V0VG91Y2hlZCgpO1xuICAgICAgICAgICAgICAgIGZvcm0ubW9kZWwuJHNldFRvdWNoZWQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn0pKCk7Il19
