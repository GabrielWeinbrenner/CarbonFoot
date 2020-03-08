$("#submit").click(function(){
    $.post("http://localhost:3001/carbon", 
    {
        "name": $("#name").val(),
        "transportation": $('input:radio[name=transport]:checked').val(),
        "beef": $("#dinner1").val(),
        "mealprep": $('input:radio[name=meals]:checked').val(),
        "product": $("#new_stuff").val()
    });
});