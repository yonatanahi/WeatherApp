let temp_manager = new TempManager
let renderer = new Renderer

const loadPage = async function () {
    await temp_manager.getDataFromDB()
    renderer.renderData(temp_manager.cityData)
}


const handleSearch = async function(){
    let cityName = $('input').val()    
    cityName = cityName[0].toUpperCase() + cityName.slice(1)
    let city = temp_manager.cityData.find(c => c.name === cityName)
    if(!city){
        let city = await temp_manager.getCityData(cityName)     
        temp_manager.cityData.push(city)       
        renderer.renderData(temp_manager.cityData)
    }
}


$('#cities').on('click', '.save', async function (){
    let cityName = $(this).closest('.city').find('.name').text()    
    await temp_manager.saveCity(cityName)
    renderer.renderData(temp_manager.cityData)
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





