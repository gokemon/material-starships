(() => {
    let starshipsComponent = {
        controller: starshipsController,
        templateUrl: 'templates/starships.html'
    };

    angular
        .module('app.starships')
        .component('starships', starshipsComponent);

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
        }

        // functions
        function activate() {
            activateStarships();
        }
        function activateStarships() {
            swapi.starships.all()
                .then((starships) => {
                    ctrl.starships = starships.results;
                    ctrl.loading = false;
                });
        }

        function addStarship(searchCount, ev) {
            // TODO: Add mdDialog
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
                hash = ((hash<<5)-hash)+char;
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