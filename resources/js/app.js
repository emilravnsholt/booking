require('./_bootstrap');
require('./_viewHeightFix');
require('./_dynamicFrontend');

$(function(){
    var mealPrices = ["59", "69", "79", "89", "99", "109"],
        drinkPrices = ["39", "49", "69"],
        mealContainer = $("#meals tbody"),
        drinkContainer = $("#drinks tbody"),
        i = 0;

    function addMeals(meals){
        mealContainer.append(meals);
    }

    function addDrinks(drinks){
        console.log("appending drinks");
        drinkContainer.append(drinks);
    }

    $.get("/templates/meal", function(template){
        var meal = $(template),
            meals = [],
            limit = 10;
            ajaxCalls = 0;
        
        while(i < limit){
            $.ajax({
                url: "https://www.themealdb.com/api/json/v1/1/random.php",
                success: function(result){
                    var price = mealPrices[Math.floor(Math.random() * mealPrices.length)],
                        name = result.meals[0].strMeal;

                    meal.find(".name").text(name);
                    meal.find(".price").text(price + ",-");
                    
                    meals.push(meal.clone());
                    ajaxCalls++;

                    if(ajaxCalls == limit){
                        addMeals(meals);
                    }
                }
            });
            i++;
        }
    });

    $.get("/templates/drink", function(template){
        var drink = $(template),
            drinks = [];
        
        $.ajax({
            url: "https://api.punkapi.com/v2/beers?page=1&per_page=10",
            success: function(result){
                $.each(result, function(key, val){
                    var price = drinkPrices[Math.floor(Math.random() * drinkPrices.length)];
                    drink.find(".name").text(val.name);
                    drink.find(".price").text(price + ",-");

                    drinks.push(drink.clone());
                });

                addDrinks(drinks);
            }
        });
    });
});