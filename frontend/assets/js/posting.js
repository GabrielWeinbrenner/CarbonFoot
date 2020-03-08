// # returns pounds of Co2 emmissions
// # Data from terrapass calcualtor
// # 200 miles for work transportation per week
// # https://www.nrc.gov/docs/ML1006/ML100621425.pdf
function getMethodOfTransportation(trans){
    var co2 = 0;
    if(trans == "electric_car"){
        co2 = 1066
    }
    else if(trans == "bus"){
        co2 = 1216
    }
    else if(trans == "train"){
        co2 = 2658
    }
    else if(trans == "car"){
        co2 = 4000
    }
    else{
        co2 = 0
    }
    console.log("Transportation: " + co2);
    return co2
}
// # https{//www.conservation.org/carbon-footprint-calculator#/individual?zipCodeInfo=usAverage

function getDiet(diet){
    var co2 = 0;
    if(diet == "out"){
        co2 = 2000
    }
    else if(diet == "home"){
        co2 = 1500
    }
    console.log("Diet: " + co2)
    return co2
}
// # https{//www.conservation.org/carbon-footprint-calculator#/individual?zipCodeInfo=usAverage
function getMeat(times){
    times = parseInt(times);
    var co2 = 0;
    if(times === 0){
        co2 = 2216
    }else if(times < 5 && times > 3 ){
        co2 = 2316
    }
    else if(times >= 6){
        co2 = 2450
    }
    console.log("Beef: " + co2)

    return co2
}

// # https://inhabitat.com/the-pros-and-cons-of-online-versus-in-store-shopping/
function getShopping(shoppingType){
    var co2 = 0;
    if(shoppingType == "online"){
        co2 = 2000
    }
    else if(shoppingType == "thrift"){
        co2 = 1000
    }
    else if(shoppingType == "instore"){
        co2 = 1500
    }
    console.log("Shopping: " + co2)
    return co2
}

// # TOTAL SCORE
function getTotal(transType, diet, meatAmount,typeShopping){
    return (getMethodOfTransportation(transType) + getDiet(diet) + getMeat(meatAmount) + getShopping(typeShopping));
}

function generateAdvice(transType, diet, meatAmount,typeShopping){
    var advice = [];
    if(transType == "car"){
        advice.push("Limit your car usage and use public transportation");
    }
    if(transType == "bus" || transType == "train"){
        advice.push("Maybe start walking/biking to your workspace ");
    }
    if(diet == "out"){
        advice.push("Start eating at home to reduce carbon emmssions")
    }
    if(meatAmount > 5){
        advice.push("To reduce carbon emmissions, start limiting your meat consumption")
    }
    if(typeShopping == "online"){
        advice.push("Start going to stores physically or shop at local stores")
    }
    if(typeShopping == "instore"){
        advice.push("Start thrifting your items to reduce CO2 emmissions")
    }
    console.log(advice);
    return advice;
}

$("#submit").click(function(){
    var transportation = $('input:radio[name=transport]:checked').val();
    var beef = $("#dinner1").val();
    var mealprep = $('input:radio[name=meals]:checked').val();
    var product = $('input:radio[name=shopping]:checked').val();
    var score = getTotal(transportation, mealprep, beef, product);
    var advice = generateAdvice(transportation,mealprep,beef,product);
    $.ajax({
        type: 'POST',
        url: "http://localhost:3001/carbon",
        data: JSON.stringify({
            "name": $("#name").val(),
            "transportation": transportation,
            "beef": beef,
            "mealprep": mealprep,
            "product": product,
            "score": score,
            "advice": advice
        }),
        contentType: "application/json"
    }).done(function(){
        window.location.href = "dashboard.html";
    })
});