
// It is safe to always assume that there are
// around 200'000 articles in the database
const ARTICLE_COUNT_ESTIMATION = 200000;

shoppingApp.factory('ShoppingModel', function($resource, $cookieStore) {
    
    var shoppingCart = [];
    var quantities = [];
    
    this.getShoppingCart = function() {
        return shoppingCart;
    };
    
    this.addArticleShoppingCart = function(article) {
        shoppingCart.push(article);
        quantities.push(1);
    };
        
    this.removeArticle = function(article) {
        var index = shoppingCart.indexOf(article);
        if (index > -1) {
            shoppingCart.splice(index, 1);
            quantities.splice(index, 1);
        }
    };
    
    this.incrementArticleQuantity = function(article) {
        var index = shoppingCart.indexOf(article);
        if (index > -1) {
            quantities[index]++;
        }
    };
    
    this.decrementArticleQuantity = function(article) {
        var index = shoppingCart.indexOf(article);
        if ((index > -1) && (quantities[index] > 0)) {
            quantities[index]--;
        }
    };
    
    this.getTotalPrice = function() {
        var price = 0;
		for (var i = 0 ; i < shoppingCart.length ; i++) {
			price += shoppingCart[i];
		}
		return price;
    };
    
    // TODO: Test implementation, might not work
    
    this.RandomArticles = $resource('https://api.zalando.com/articles', {}, {
        get: {}
    });
    
    this.SearchArticles = $resource('https://api.zalando.com/articles', {}, {
        get: {}
    });
    
    this.Article = $resource('https://api.zalando.com/articles/:id', {}, {
        get: {}
    });
    return this;
    
});

