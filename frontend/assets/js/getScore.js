var length;
var currentScore;
$.when($.getJSON("http://localhost:3001/carbon")).then(function(data){
    length = data.length;
    console.log(length)
    $.when($.get("http:localhost:3001/carbon/"+length)).then(function(data){
        currentScore =data.score
        $("#score").html("<h2>Score: "+currentScore +"</h2>")

    })

})

