shoppingApp.controller('MainController', function($scope, ShoppingModel){
    
    $scope.searchResults = [];
    $scope.randomArticles = [];
    
    $scope.searchForArticles = function(searchString,resultsCount){
        
        ShoppingModel.SearchArticles.get({
            pageSize: resultsCount,
            fullText: searchString
        },function(data){
            $scope.searchResults = data.content;
            
        });
        
    };
    
    $scope.getRandomArticles= function(resultsCount){
        ShoppingModel.RandomArticles.get({
            pageSize: resultsCount
        }, function(data){
            $scope.randomArticles = data.content;
        });
        
    };
     $scope.getCartSize = function(){
         return ShoppingModel.getShoppingCart().length;
     };
});