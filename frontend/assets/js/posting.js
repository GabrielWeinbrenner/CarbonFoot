$("#submit").click(function(){
    $.post("http://localhost:3001/carbon", 
    {
        "name": $("#name").val(),
        "transportation": "$('transport').val()",
        "beef": $("#dinner1").val(),
        "mealprep": "$('#mealprep').val()",
        "product": $("#new_stuff").val()
    });
});