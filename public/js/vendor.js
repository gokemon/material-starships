(function() {
  angular.module('ne.swapi', []);
})();

(function() {
  angular.module('ne.swapi')
  .constant('endpoints', endpoints());

  function endpoints() {
    var root = 'https://swapi.co/api/',
        people = 'people/',
        films = 'films/',
        starships = 'starships/',
        vehicles = 'vehicles/',
        species = 'species/',
        planets = 'planets/'

    return {
      ROOT: root,
      PEOPLE: root + people,
      FILMS: root + films,
      STARSHIPS: root + starships,
      VEHICLES: root + vehicles,
      SPECIES: root + species,
      PLANETS: root + planets
    };
  }

})();

(function() {
  angular.module('ne.swapi')
  .factory('swapi', swapi)

  swapi.$inject = ['$http', '$q', 'endpoints'];
  function swapi($http, $q, endpoints) {
    var service = {
      get: get,
      films: generateInterface(endpoints.FILMS),
      people: generateInterface(endpoints.PEOPLE),
      planets: generateInterface(endpoints.PLANETS),
      species: generateInterface(endpoints.SPECIES),
      starships: generateInterface(endpoints.STARSHIPS),
      vehicles: generateInterface(endpoints.VEHICLES)
    };

    return service;

    function generateInterface(url) {
      return {
        all: getAll(url),
        id: getRecord(url),
        get: function() { return get(url)},
        page: getPaged(url),
        schema: getSchema(url)
      };
    }

    function get(url) {
      return $http.get(url)
      .then(function(response) {
        return response.data;
      })
      .catch(function(error) {
        $q.reject(error)
      });
    }

    function getAll(url) {
      return function() {
        var deferred = $q.defer(),
          results = [];

        fetchRecords(url);
        return deferred.promise;

        function fetchRecords(url) {
          get(url)
          .then(function(data) {
            results = results.concat(data.results);
            if (typeof data.next === 'string') {
              fetchRecords(data.next)
            } else {
              deferred.resolve({count: results.length, results: results})
            }
          })
          .catch(function(error) {
            deferred.reject(error);
          });
        }
      }
    }

    function getRecord(url) {
      return function(id) {
        return get( url + (id || '1') + '/' );
      }
    }

    function getPaged(url) {
      return function(page) {
        return get( url + '?page=' + (page || '') );
      }
    }

    function getSchema(url) {
      return function() {
        return get( url + 'schema');
      }
    }
  }

})();

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5lLXN3YXBpLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJ2ZW5kb3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKSB7XHJcbiAgYW5ndWxhci5tb2R1bGUoJ25lLnN3YXBpJywgW10pO1xyXG59KSgpO1xyXG5cclxuKGZ1bmN0aW9uKCkge1xyXG4gIGFuZ3VsYXIubW9kdWxlKCduZS5zd2FwaScpXHJcbiAgLmNvbnN0YW50KCdlbmRwb2ludHMnLCBlbmRwb2ludHMoKSk7XHJcblxyXG4gIGZ1bmN0aW9uIGVuZHBvaW50cygpIHtcclxuICAgIHZhciByb290ID0gJ2h0dHBzOi8vc3dhcGkuY28vYXBpLycsXHJcbiAgICAgICAgcGVvcGxlID0gJ3Blb3BsZS8nLFxyXG4gICAgICAgIGZpbG1zID0gJ2ZpbG1zLycsXHJcbiAgICAgICAgc3RhcnNoaXBzID0gJ3N0YXJzaGlwcy8nLFxyXG4gICAgICAgIHZlaGljbGVzID0gJ3ZlaGljbGVzLycsXHJcbiAgICAgICAgc3BlY2llcyA9ICdzcGVjaWVzLycsXHJcbiAgICAgICAgcGxhbmV0cyA9ICdwbGFuZXRzLydcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBST09UOiByb290LFxyXG4gICAgICBQRU9QTEU6IHJvb3QgKyBwZW9wbGUsXHJcbiAgICAgIEZJTE1TOiByb290ICsgZmlsbXMsXHJcbiAgICAgIFNUQVJTSElQUzogcm9vdCArIHN0YXJzaGlwcyxcclxuICAgICAgVkVISUNMRVM6IHJvb3QgKyB2ZWhpY2xlcyxcclxuICAgICAgU1BFQ0lFUzogcm9vdCArIHNwZWNpZXMsXHJcbiAgICAgIFBMQU5FVFM6IHJvb3QgKyBwbGFuZXRzXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbn0pKCk7XHJcblxyXG4oZnVuY3Rpb24oKSB7XHJcbiAgYW5ndWxhci5tb2R1bGUoJ25lLnN3YXBpJylcclxuICAuZmFjdG9yeSgnc3dhcGknLCBzd2FwaSlcclxuXHJcbiAgc3dhcGkuJGluamVjdCA9IFsnJGh0dHAnLCAnJHEnLCAnZW5kcG9pbnRzJ107XHJcbiAgZnVuY3Rpb24gc3dhcGkoJGh0dHAsICRxLCBlbmRwb2ludHMpIHtcclxuICAgIHZhciBzZXJ2aWNlID0ge1xyXG4gICAgICBnZXQ6IGdldCxcclxuICAgICAgZmlsbXM6IGdlbmVyYXRlSW50ZXJmYWNlKGVuZHBvaW50cy5GSUxNUyksXHJcbiAgICAgIHBlb3BsZTogZ2VuZXJhdGVJbnRlcmZhY2UoZW5kcG9pbnRzLlBFT1BMRSksXHJcbiAgICAgIHBsYW5ldHM6IGdlbmVyYXRlSW50ZXJmYWNlKGVuZHBvaW50cy5QTEFORVRTKSxcclxuICAgICAgc3BlY2llczogZ2VuZXJhdGVJbnRlcmZhY2UoZW5kcG9pbnRzLlNQRUNJRVMpLFxyXG4gICAgICBzdGFyc2hpcHM6IGdlbmVyYXRlSW50ZXJmYWNlKGVuZHBvaW50cy5TVEFSU0hJUFMpLFxyXG4gICAgICB2ZWhpY2xlczogZ2VuZXJhdGVJbnRlcmZhY2UoZW5kcG9pbnRzLlZFSElDTEVTKVxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gc2VydmljZTtcclxuXHJcbiAgICBmdW5jdGlvbiBnZW5lcmF0ZUludGVyZmFjZSh1cmwpIHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBhbGw6IGdldEFsbCh1cmwpLFxyXG4gICAgICAgIGlkOiBnZXRSZWNvcmQodXJsKSxcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gZ2V0KHVybCl9LFxyXG4gICAgICAgIHBhZ2U6IGdldFBhZ2VkKHVybCksXHJcbiAgICAgICAgc2NoZW1hOiBnZXRTY2hlbWEodXJsKVxyXG4gICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldCh1cmwpIHtcclxuICAgICAgcmV0dXJuICRodHRwLmdldCh1cmwpXHJcbiAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGE7XHJcbiAgICAgIH0pXHJcbiAgICAgIC5jYXRjaChmdW5jdGlvbihlcnJvcikge1xyXG4gICAgICAgICRxLnJlamVjdChlcnJvcilcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0QWxsKHVybCkge1xyXG4gICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIGRlZmVycmVkID0gJHEuZGVmZXIoKSxcclxuICAgICAgICAgIHJlc3VsdHMgPSBbXTtcclxuXHJcbiAgICAgICAgZmV0Y2hSZWNvcmRzKHVybCk7XHJcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGZldGNoUmVjb3Jkcyh1cmwpIHtcclxuICAgICAgICAgIGdldCh1cmwpXHJcbiAgICAgICAgICAudGhlbihmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdHMgPSByZXN1bHRzLmNvbmNhdChkYXRhLnJlc3VsdHMpO1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIGRhdGEubmV4dCA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgICBmZXRjaFJlY29yZHMoZGF0YS5uZXh0KVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoe2NvdW50OiByZXN1bHRzLmxlbmd0aCwgcmVzdWx0czogcmVzdWx0c30pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24oZXJyb3IpIHtcclxuICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KGVycm9yKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldFJlY29yZCh1cmwpIHtcclxuICAgICAgcmV0dXJuIGZ1bmN0aW9uKGlkKSB7XHJcbiAgICAgICAgcmV0dXJuIGdldCggdXJsICsgKGlkIHx8ICcxJykgKyAnLycgKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldFBhZ2VkKHVybCkge1xyXG4gICAgICByZXR1cm4gZnVuY3Rpb24ocGFnZSkge1xyXG4gICAgICAgIHJldHVybiBnZXQoIHVybCArICc/cGFnZT0nICsgKHBhZ2UgfHwgJycpICk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRTY2hlbWEodXJsKSB7XHJcbiAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gZ2V0KCB1cmwgKyAnc2NoZW1hJyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG59KSgpO1xyXG4iXX0=
