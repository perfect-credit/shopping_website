
shoppingApp.controller('MainController', function($scope, ShoppingModel){
    
    // Filters
    $scope.filters = [
        {
            name: 'Color',
            key: 'color',
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
            key: 'price',
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
            key: 'size',
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
            key: 'season',
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
            key: 'pattern',
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
    $scope.categories = [
        {
            name: 'Dresses',
            key: 'womens-clothing-dresses'
        },
        {
            name: 'Tops & T-Shirts',
            key: 'womens-clothing-tops'
        },
        {
            name: 'Jeans',
            key: 'womens-clothing-jeans'
        },
        {
            name: 'Jackets',
            key: 'womens-clothing-jackets'
        },
        {
            name: 'Coats',
            key: 'womens-clothing-coats'
        },
        {
            name: 'Trousers & Shorts',
            key: 'womens-clothing-trousers-leggings'
        },
        {
            name: 'Blouses & Tunics',
            key: 'womens-clothing-blouses-tunics'
        },
        {
            name: 'Skirts',
            key: 'womens-clothing-skirts'
        },
        {
            name: 'Lingerie & Nightwear',
            key: 'womens-clothing-lingerie-nightwear'
        },
        {
            name: 'Tights & Socks',
            key: 'womens-clothing-tights-socks'
        }
    ];
    $scope.selectedCategory = '';
    
    $scope.searchResults = [];
    $scope.randomArticles = [];
    
    $scope.searchForArticles = function(searchString,resultsCount){
        var params = {
            pageSize: resultsCount,
            fullText: searchString
        };
        for(var i=0; i<$scope.filters.lenght;i++){
            var filter= $scope.filters[i];
            var firstTime= true;
            for(var j=0; j<filter.values.lenght; j++){
                if(filter.values[j].selected){
                    
                    if(firstTime){
                        params[filter.key]= [filter.values[j].value];
                        firstTime=false;
                        
                        
                    }
                    else{
                        
                        params[filter.key].push(filter.values[j].value);
                    }
                }
                
                
            }
            
            
        }
        
        ShoppingModel.SearchArticles.get(params,function(data){
            $scope.searchResults = data.content;
            
            var unit;
            for (var i = 0 ; i < $scope.searchResults.length ; i++) {
                if ('size' in params) {
                    var units = $scope.searchResults[i].units;
                    for (var j = 0 ; j < units.length ; j++) {
                        if (isLetterSize(units[j].size)) {
                            if (units[j].size === params.size) {
                                unit = JSON.parse(JSON.stringify(units[j]));
                                delete unit.id;
                                $scope.searchResults[i].unit = unit;
                                break;
                            }
                        } else {
                            if (sizeNumberToLetter(parseInt(units[j].size)) === params.size) {
                                unit = JSON.parse(JSON.stringify(units[j]));
                                delete unit.id;
                                $scope.searchResults[i].unit = unit;
                                break;
                            }
                        }
                    }
                } else {
                    unit = JSON.parse(JSON.stringify($scope.searchResults[i].units[0]));
                    delete unit.id;
                    $scope.searchResults[i].unit = unit;
                }
            }
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
            $scope.searchResults.push(data);
        });
    };
    
});

const SIZES = {
    XXS: '-4',
    XS: '-6',
    S: '8-10',
    M: '12-14',
    L: '16-18',
    XL: '20-22',
    XXL: '24-'
};

function sizeLetterToNumber(letter) {
    var bounds = SIZES[letter].split('-');
    return (bounds[0] === '') ? bounds[1] : bounds[0];
}

function sizeNumberToLetter(number) {
    for (var size in SIZES) {
        var bounds = SIZES[size].split('-')/*.map(function(n) { return parseInt(n); })*/;
        if (((bounds[0] === '') && (number <= parseInt(bounds[1]))) ||
            ((bounds[1] === '') && (number >= parseInt(bounds[0]))) ||
                ((bounds[0] !== '') && (bounds[1] !== '') &&
                    (number >= parseInt(bounds[0])) && (number <= parseInt(bounds[1])))) {
            return size;
        }
    }
}

function isLetterSize(size) {
    return ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'].indexOf(size) > -1;
}

