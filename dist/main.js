let temp_manager = new TempManager
let renderer = new Renderer

const loadPage = async function () {
    await temp_manager.getDataFromDB()
    renderer.renderData(temp_manager.cityData)
}


const handleSearch = async function(){
    let cityName = $('input').val()
    $('input').val("") 
    if(cityName.length > 0){
        cityName = cityName[0].toUpperCase() + cityName.slice(1)
        let city = temp_manager.cityData.find(c => c.name === cityName)
        if(!city){
            let city = await temp_manager.getCityData(cityName)             
            if(city != "city not found"){
                temp_manager.cityData.push(city)       
                renderer.renderData(temp_manager.cityData)
            }else{
                console.log("city not found")
                
            }
        }
    }else{
        console.log("empty string");
    }
}


$('#cities').on('click', '.save', async function (){
    let cityName = $(this).closest('.city').find('.name').text()    
    await temp_manager.saveCity(cityName)
    renderer.renderData(temp_manager.cityData)
    console.log("1")
})


$('#cities').on('click', '.remove', async function (){
    let cityName = $(this).closest('.city').find('.name').text()    
    await temp_manager.removeCity(cityName)
    renderer.renderData(temp_manager.cityData)
})

$('#cities').on('click', 'i', async function (){
    let cityName = $(this).closest('.city').find('.name').text()    
    let city = await temp_manager.getCityData(cityName)  
    let cityIndex = temp_manager.cityData.findIndex(c => c.name === city.name)
    temp_manager.cityData.splice(cityIndex, 1, city)    
    renderer.renderData(temp_manager.cityData)
})

loadPage()





