// # returns pounds of Co2 emmissions
// # Data from terrapass calcualtor
// # 200 miles for work transportation per week
// # https://www.nrc.gov/docs/ML1006/ML100621425.pdf
function getMethodOfTransportation(trans){
    if(trans == "electric_car"){
        return 1066
    }
    else if(trans == "bus"){
        return 1216
    }
    else if(trans == "train"){
        return 2658
    }
    else if(trans == "car"){
        return 4000
    }
    else{
        return 0
    }
}
// # https{//www.conservation.org/carbon-footprint-calculator#/individual?zipCodeInfo=usAverage

function getDiet(diet){
    if(diet == "out"){
        return 2000
    }
    else if(diet == "home"){
        return 1500
    }
    return 0
}
// # https{//www.conservation.org/carbon-footprint-calculator#/individual?zipCodeInfo=usAverage
function getMeat(times){
    if(times == 0){
        return 2216
    }else if(times < 5 && times > 3 ){
        return 2316
    }
    else if(times > 6){
        return 2450
    }
    return 0
}

// # https://inhabitat.com/the-pros-and-cons-of-online-versus-in-store-shopping/
function getShopping(shoppingType){
    if(shoppingType == "online"){
        return 2000
    }
    else if(shoppingType == "thrift"){
        return 1000
    }
    else if(shoppingType == "instore"){
        return 1500
    }
    return 0
}

// # TOTAL SCORE
function getTotal(transType, diet, meatAmount,typeShopping){
    return (getMethodOfTransportation(transType) + getDiet(diet) + getMeat(meatAmount) + getShopping(typeShopping));
}

$("#submit").click(function(){
    var transportation = $('input:radio[name=transport]:checked').val();
    var beef = $("#dinner1").val();
    var mealprep = $('input:radio[name=meals]:checked').val();
    var product = $('input:radio[name=shopping]:checked').val();
    var score = getTotal(transportation, mealprep, beef, product)
    $.post("http://localhost:3001/carbon", 
    {
        "name": $("#name").val(),
        "transportation": transportation,
        "beef": beef,
        "mealprep": mealprep,
        "product": product,
        "score": score
    });
});