class Renderer{
    renderData = function(allCityData){
        const source = $('#city-template').html();
        const template = Handlebars.compile(source);
        let newHTML = template({ allCityData});
        $('#cities').empty().append(newHTML); 
    }
}

 