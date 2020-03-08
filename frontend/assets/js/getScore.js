var length;
var currentScore;
var advice;
$.when($.getJSON("http://localhost:3001/carbon")).then(function(data){
    length = data.length;
    $.when($.get("http:localhost:3001/carbon/"+length)).then(function(data){
        currentScore = data.score
        advice = data.advice;
        console.log(data);
        if(currentScore < 6000){
            $("#score").html("<h2 style='color:green;'>Score: "+currentScore +"lbs of CO2</h2>")
        }else if(currentScore > 6000 && currentScore < 7500){
            $("#score").html("<h2 style='color:#9B870C;'>Score: "+currentScore +"lbs of CO2</h2>")
        }else if(currentScore > 7500){
            $("#score").html("<h2 style='color:red;'>Score: "+currentScore +"lbs of CO2</h2>")
        }
        for(var i =0; i< advice.length; i++){
            $("#advice").append("<li>"+advice[i]+"</li>")
        }
    })

})

