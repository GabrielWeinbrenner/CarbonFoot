var length;
var currentScore;
$.when($.getJSON("http://localhost:3001/carbon")).then(function(data){
    length = data.length;
    console.log(length)
    $.when($.get("http:localhost:3001/carbon/"+length)).then(function(data){
        currentScore = data.score
        if(currentScore < 6000){
            $("#score").html("<h2 style='color:green;'>Score: "+currentScore +"lbs of CO2</h2>")
        }else if(currentScore > 6000 && currentScore < 7500){
            $("#score").html("<h2 style='color:#9B870C;'>Score: "+currentScore +"lbs of CO2</h2>")
        }else if(currentScore > 7500){
            $("#score").html("<h2 style='color:red;'>Score: "+currentScore +"lbs of CO2</h2>")
        }

    })

})

