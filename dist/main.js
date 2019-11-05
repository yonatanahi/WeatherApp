let temp_manager = new TempManager
let renderer = new Renderer


const loadPage = async function () {
    await temp_manager.getDataFromDB()
    renderer.renderData(temp_manager.cityData)
}


const handleSearch = async function(){
    let cityName = $('input').val()
    let name = temp_manager.cityData.some(c => c.name === cityName)
    if(!name){
        await temp_manager.getCityData(cityName)            
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


loadPage()





