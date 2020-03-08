$("#submit").click(function(){
    var transportation = $('input:radio[name=transport]:checked').val();
    var beef = $("#dinner1").val();
    var mealprep = $('input:radio[name=meals]:checked').val();
    var product = $("#new_stuff").val();
    $.post("http://localhost:3001/carbon", 
    {
        "name": $("#name").val(),
        "transportation": transportation,
        "beef": beef,
        "mealprep": mealprep,
        "product": product
    });
});