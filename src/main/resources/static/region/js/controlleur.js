var appname = angular.module('myapp', ['ngRoute']);

appname.config(['$locationProvider',function($locationProvider) {
  $locationProvider.html5Mode(true);
}]);

appname.controller('listeSignControl', ['$scope','$http',
function($scope,$http) {
  $scope.getSignalements=function($args){
    $http.get('http://localhost:8080/signalement/getNewSignalement',{
        headers : {'token':$args}
    }).then(function (response) {
      $scope.data=response.data; 
    });
  }
  $scope.test=function($args){
    console.log($args);
  }
}

]);



appname.controller('testControl', ['$scope','$http','$location','$window',
function($scope,$http,$location,$window) {
  $scope.getSignalement=function($args){

    $http.get('http://localhost:8080/signalement/getSignalement?id='+$location.search().id+'', {
        headers : {'token':$args}
    }).then(function (response) {
      $scope.signalement=response.data;
      var marker = L.marker([$scope.signalement.latitude, $scope.signalement.longitude]).addTo(macarte);
      $http.get('https://nominatim.openstreetmap.org/reverse?format=json&lat='+$scope.signalement.latitude+'&lon='+$scope.signalement.longitude+'&zoom=18&addressdetails=1&fbclid=IwAR30BvNdX9B3P-mKUnh6H2bOv2KjXDngOnXosNHbvyX_8Y5Ddd-Vlih0zqc').then(function (response) {
            $scope.region=response.data.address.state;
            console.log($scope.region);
          });
    });
    $http.get('http://localhost:8080/region/getRegions',{
        headers : {'token':$args}
    }).then(function (response) {
            $scope.lregions=response.data;
    });
  }
  $scope.attribuerRegion=function(){
  console.log("id signalement ="+$location.search().id);
  console.log("id region ="+$scope.idregion);
  $http.get('http://localhost:8080/signalement/attribuer?idSignalement='+$location.search().id+"&idRegion="+$scope.idregion).then(function (response) {
      });
      $window.location.href = '/NouveauxSignalements';
  }
}]);

appname.controller('tablesControl', ['$scope','$http','$location',
function($scope,$http,$location) {

  $scope.getRegions=function($args){
    $http.get('http://localhost:8080/region/getRegions',{
        headers : {'token':$args}
    }).then(function (response) {
      $scope.regions=response.data;
      console.log($scope.regions);
    });
  }
  $scope.getUtilisateurs=function($args){
      $http.get('http://localhost:8080/utilisateur/getUtilisateurs',
      {
        headers : {'token':$args}
      }).then(function (response) {
        $scope.utilisateurs=response.data;
        console.log($scope.utilisateurs);
      });
    }
    $scope.getTypeSignalements=function($args){
        $http.get('http://localhost:8080/typesignalement/getTypeSignalements',{
            headers : {'token':$args}
        }).then(function (response) {
          $scope.typeSignalements=response.data;
          console.log($scope.typeSignalements);
        });
      }
  $scope.getData=function($args){
    $scope.getRegions($args);
    $scope.getUtilisateurs($args);
    $scope.getTypeSignalements($args);
  }



}

]);

appname.controller('modControl', ['$scope','$http','$location',
function($scope,$http,$location) {

  $scope.getModifierRegion=function(){
    $http.get('http://localhost:8080/region/modifier?id='+$location.search().id).then(function (response) {
              $scope.region=response.data;
              console.log(response.data);
            });
  }
  $scope.getModifierUtilisateur=function(){
      $http.get('http://localhost:8080/utilisateur/modifier?id='+$location.search().id).then(function (response) {
                $scope.region=response.data;
              });
    }
    $scope.getModifierType=function(){
        $http.get('http://localhost:8080/typesignalement/modifier?id='+$location.search().id).then(function (response) {
                  $scope.region=response.data;
                });
      }
    if($location.search().region!=null){
        console.log("modification region");
        $scope.getModifierRegion();
    }
    if($location.search().utilisateur!=null){
        console.log("modification utilisateur");
        $scope.getModifierUtilisateur();
    }
    if($location.search().typesignalement!=null){
        console.log("modification utilisateur");
        $scope.getModifierUtilisateur();
    }


  $scope.modifierRegion=function(){
      $id = $location.search().id;
      $designation = $scope.designation;
      $identifiant = $scope.username;
      $mdp = $scope.password;
      console.log($id);
      console.log($designation);
      console.log($identifiant);
      console.log($mdp);

      /*$http.get('http://localhost:8080/region/modifier?id='+$id+'&designation='+$designation+"'&username='"+$username+"'&mdp='"+$mdp+"'").then(function (response) {
            });*/
  }

  $scope.modifierUtilisateur=function(){
        $id = $location.search().id;
        email = $scope.email;
        $identifiant = $scope.username;
        $mdp = $scope.password;
        $dtn = $scope.dtn;
        console.log($id);
        console.log(email);
        console.log($identifiant);
        console.log($mdp);
        console.log($dtn);

        /*$http.get('http://localhost:8080/region/modifier?id='+$id+'&designation='+$designation+"'&username='"+$username+"'&mdp='"+$mdp+"'").then(function (response) {
              });*/
    }

    $scope.modifierUtilisateur=function(){
            $id = $location.search().id;
            email = $scope.email;
            $identifiant = $scope.username;
            $mdp = $scope.password;
            $dtn = $scope.dtn;
            console.log($id);
            console.log(email);
            console.log($identifiant);
            console.log($mdp);
            console.log($dtn);

            /*$http.get('http://localhost:8080/utilisateur/modifier?id='+$id+'&designation='+$designation+"'&username='"+$username+"'&mdp='"+$mdp+"'").then(function (response) {
                  });*/
        }

     $scope.modifierTypeSignalement=function(){
        $id = $location.search().id;
        $designation = $scope.designation;
        console.log($id);
        console.log($designation)
     }


}

]);

appname.controller('regionControl', ['$scope','$http','$location','$window',
function($scope,$http,$location,$window) {
  $scope.getSignalements=function($args,$id){

    $http.get('http://localhost:8080/signalementregion/getSignalementByRegion?id='+$id+'', {
        headers : {'token':$args}
    }).then(function (response) {
      $scope.signalement=response.data;
      //var marker = L.marker([$scope.signalement.latitude, $scope.signalement.longitude]).addTo(macarte);
      console.log($scope.signalement);
    });

  }
  $scope.attribuerRegion=function(){
  console.log("id signalement ="+$location.search().id);
  console.log("id region ="+$scope.idregion);
  $http.get('http://localhost:8080/signalement/attribuer?idSignalement='+$location.search().id+"&idRegion="+$scope.idregion).then(function (response) {
      });
      $window.location.href = '/NouveauxSignalements';
  }
}]);






