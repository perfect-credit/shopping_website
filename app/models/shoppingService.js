
// It is safe to always assume that there are
// around 200'000 articles in the database
const ARTICLE_COUNT_ESTIMATION = 200000;

// Filters
const FILTERS = [
    {
        name: 'Color',
        values: [
            {
                name: 'Black',
                value: 'black',
                selected: false
            },
            {
                name: 'White',
                value: 'white',
                selected: false
            },
            {
                name: 'Grey',
                value: 'gray',
                selected: false
            },
            {
                name: 'Blue',
                value: 'blue',
                selected: false
            },
            {
                name: 'Red',
                value: 'red',
                selected: false
            },
            {
                name: 'Multicolored',
                value: 'multicolored',
                selected: false
            }
        ]
    },
    {
        name: 'Price',
        values: [
            {
                name: '< 15 £',
                value: '0-15',
                selected: false
            },
            {
                name: '15 £ - 50 £',
                value: '15-50',
                selected: false
            },
            {
                name: '50 £ - 100 £',
                value: '50-100',
                selected: false
            },
            {
                name: '100 £ - 500 £',
                value: '100-500',
                selected: false
            },
            {
                name: '> 500 £',
                value: '500-100000',
                selected: false
            }
        ]
    },
    {
        name: 'Size',
        values: [
            {
                name: 'XS',
                value: 'XS',
                selected: false
            },
            {
                name: 'S',
                value: 'S',
                selected: false
            },
            {
                name: 'M',
                value: 'M',
                selected: false
            },
            {
                name: 'L',
                value: 'L',
                selected: false
            },
            {
                name: 'XL',
                value: 'XL',
                selected: false
            }
        ]
    },
    {
        name: 'Collection',
        values: [
            {
                name: 'Spring/Summer',
                value: 'summer',
                selected: false
            },
            {
                name: 'Autumn/Winter',
                value: 'winter',
                selected: false
            }
        ]
    },
    {
        name: 'Pattern',
        values: [
            {
                name: 'Colored',
                value: 'colored',
                selected: false
            },
            {
                name: 'Striped',
                value: 'striped',
                selected: false
            },
            {
                name: 'Polka Dot',
                value: 'polkaDot',
                selected: false
            },
            {
                name: 'Checkered',
                value: 'checkered',
                selected: false
            },
            {
                name: 'Plain',
                value: 'plain',
                selected: false
            }
        ]
    }
];

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
    
    this.RandomArticles = $resource('https://api.zalando.com/articles', {
        page: parseInt(Math.random() * (ARTICLE_COUNT_ESTIMATION / parseInt('@pageSize'))) + 1
    }, {
        get: {}
    });
    
    this.SearchArticles = $resource('https://api.zalando.com/articles', {}, {
        get: {}
    });
    
    this.Article = $resource('https://api.zalando.com/articles/:id', {}, {
        get: {}
    });
    
});
