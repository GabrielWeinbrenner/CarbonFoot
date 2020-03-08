var length;
var currentScore;
var advice;
var companies;
var scoreboard;
// // Account #1 - GA2JSEGSJAREL7RYEZ4CU4Y4QB24CW7QFXBOWFLF5NMGJLJNY2IJ2Y6V
// // SCHB52IVRHQT5YIVL6GTI5ZXKQG7HIK4SOQIQUCR6FKRRALNS5ZQQVGH

// // Account #2 - GAECLRZZHNCTVIIXHVKQLGXITMFZWAYRCSXV3JKNINCWVFHXP4DKZMRV
// // SCINDXGLYIA7WHZEUT5O4YUKH67YUQUZADJPPYB52556BO2A7P25VKSQ 

$.when($.getJSON("http://localhost:3001/carbon")).then(function(data){
    length = data.length;
    $.when($.get("http:localhost:3001/carbon/"+length)).then(function(data){
        currentScore = data.score
        advice = data.advice;
        companies = data.companies;
        
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
        for(var i =0; i< companies.length; i++){
            $("#companies").append("<li>"+companies[i]+"</li>")
        }
    })

})
$.when($.get("http:localhost:3001/carbon")).then(function(data){
    for(var i =0; i< data.length; i++){
        console.log(data[i].name);
        $("#leaders").append(
            "<tr><td>"+data[i].name+"</td><td>"+
            data[i].score+"</td><td>"+
			"<img class='challenge' src='images/challenge.png' style='margin-left:20px; position:center; height:30px;'/>"+
            "</tr>"
        )

    }   
    $(".challenge").click(function(){
        alert("You are challenging this user to have the lower Carbon Karma after 30 days!");
        var address = prompt("Enter your private address for the Stellar Network");
        var numberOfLumens = prompt("How many lumens (XLM) do you want to use for your challenge?");
        alert("Lumens will be sent to the public address GAECLRZZHNCTVIIXHVKQLGXITMFZWAYRCSXV3JKNINCWVFHXP4DKZMRV");
        alert("Source: GA2JSEGSJAREL7RYEZ4CU4Y4QB24CW7QFXBOWFLF5NMGJLJNY2IJ2Y6V \n Destination: GAECLRZZHNCTVIIXHVKQLGXITMFZWAYRCSXV3JKNINCWVFHXP4DKZMRV \n Asset: Lumens\nAmount: " + numberOfLumens + "\nHash: f0caec25da71b5775d3e6b8e1e2f8dda78182386c88771ea0011c5a0c6964be8 \n XDR: AAAAADSZENJIIkX+OCZ4KnMcgHXBW/AtwusVZetYZK0txpCdAAAAZAAJW48AAAABAAAAAAAAAAAAAAABAAAAAQAAAAA0mRDSSCJF/jgmeCpzHIB1wVvwLcLrFWXrWGStLcaQnQAAAAEAAAAACCXHOTtFOqEXPVUFmuibC5sDERSvXaVNQ0VqlPd/BqwAAAAAAAAAAlQL5AAAAAAAAAAAAA==");
        main();
    }); 
})




