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
        drinkContainer.append(drinks);
    }


    function addQty(elem){
        var inp = elem.closest(".qty").find(".qty_inp");
        var inpVal = Number(inp.val());
        inp.val(inpVal + 1); // Add 1

        if(inp.val() < 0){
            inp.val(0); // Min. 0
        } else if(inp.val() > 10){
            inp.val(10); // Max. 10
        }
    }


    function removeQty(elem){
        var inp = elem.closest(".qty").find(".qty_inp");
        inp.val(inp.val() - 1); // Remove 1

        if(inp.val() < 0){
            inp.val(0); // Min. 0
        } else if(inp.val() > 10){
            inp.val(10); // Max. 10
        }
    }


    // When clicking on 'plus button'
    $("#meals, #drinks").on("click", ".up", function(){
        addQty($(this));
    });
    // When clicking on 'minus button'
    $("#meals, #drinks").on("click", ".down", function(){
        removeQty($(this));
    });


    // Submission of booking form
    $("#booking_form").on("submit", function(e){
        e.preventDefault();
        var formData = $(this).serialize();

        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });

        $.ajax({
            url: "booking",
            method: "POST",
            data: formData,
            success: function(result){
                $("#booking_form .error, #booking_form .success").hide();
                if(result.errors){
                    $.each(result.errors, function(key, val){
                        console.log(key, val[0]);
                        $("<small class='error'>" + val[0] + "</small>").insertAfter("input[name='"+key+"'], select[name='"+key+"']");
                    });
                } else if(result.success){
                    $("#booking_form button[type='submit']")
                    .text(result.success)
                    .attr("disabled", true);
                }
            }
        })
    });

    /**
     * Load random meals from themealdb API.
     * Every call returns a random meal.
     * Call the API x amount of times, to get a list of random meals.
     * List the meals on frontend through a template.
     */
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
                        name = result.meals[0].strMeal,
                        id = result.meals[0].idMeal;

                    meal.find(".name").text(name);
                    meal.find(".name_inp").attr("name", "meals[" + id + "][name]");
                    meal.find(".price_inp").attr("name", "meals[" + id + "][price]");
                    meal.find(".qty_inp").attr("name", "meals[" + id + "][qty]");
                    meal.find(".price_inp").val(price);
                    meal.find(".name_inp").val(name);
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


    /**
     * Get a list of beers from punkapi's API.
     * Call the API once with the pagination parameter set to x amount of beers.
     * List the beers on frontend through a template.
     */
    $.get("/templates/drink", function(template){
        var drink = $(template),
            drinks = [];
        
        $.ajax({
            url: "https://api.punkapi.com/v2/beers?page=1&per_page=10",
            success: function(result){
                $.each(result, function(key, val){
                    var price = drinkPrices[Math.floor(Math.random() * drinkPrices.length)],
                    name = val.name,
                    id = val.id;

                    drink.find(".name").text(name);
                    drink.find(".name_inp").attr("name", "drinks[" + id + "][name]");
                    drink.find(".price_inp").attr("name", "drinks[" + id + "][price]");
                    drink.find(".qty_inp").attr("name", "drinks[" + id + "][qty]");
                    drink.find(".price_inp").val(price);
                    drink.find(".name_inp").val(name);
                    drink.find(".price").text(price + ",-");

                    drinks.push(drink.clone());
                });

                addDrinks(drinks);
            }
        });
    });
});