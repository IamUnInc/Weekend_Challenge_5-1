myApp.factory('DataFactory', ['$http', function($http) {

     var favs = [];
     var currentPet = {};
     var favoriteCount;

     getFavs();
     function getFavs() {
     console.log('GET DATA FROM SERVER');
     var promise = $http.get('/pets').then(function(response){
       console.log('Data response:', response);
       response.data.forEach(function (pet) {
         //favs.push(pet);
       });
       var favs = response.data;

     });
     return promise;
   };



console.log(favs);
    var addFavs = function(id, name, url, description) {
      console.log('Adding favorite');
      currentPet.petID = id;
      currentPet.petName = name;
      currentPet.imageURL = url;
      currentPet.description = description.substring(0, 100);
      var promise = $http.post('/pets', currentPet).then(function () {
        return getFavs();
      });
      return promise;
    }

  //PUBLIC API OBJECT
   return {
     retrieveData: function() {
       return getFavs();
     },
     favsArray: favs,
     count: favoriteCount,
     petData: function() {
       return currentPet;
     },
     addFaves: function(id, name, url, description) {
       return addFavs(id, name, url, description);
     }

   };

}])
