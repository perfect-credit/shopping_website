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
            pageSize: resultsCount,
            page: parseInt(Math.random() * (ARTICLE_COUNT_ESTIMATION / parseInt(resultsCount))) + 1
        }, function(data){
            $scope.randomArticles = data.content;
        });
        
    };
     $scope.getCartSize = function(){
         console.log(ShoppingModel.getShoppingCart().length);
         return ShoppingModel.getShoppingCart().length;
     };
    
    $scope.temp= function(id){
        ShoppingModel.Article.get({id:id}, function(data){
            $scope.searchResults.push(data);;
        });
    };
    
    
});