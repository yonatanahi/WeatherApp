class TempManager{
    constructor(){
        this.cityData = []
    }

    getDataFromDB = async function(){
        let data = await $.get('/cities')
            this.cityData = data
        
    }

    getCityData = async function (cityName) {
        let data = await $.get(`/city/${cityName}`) 
        if(data.messsage !== undefined){
            let city = {
                name: data.name,
                temperature: data.main.temp,
                condition: data.weather[0].main,
                conditionPic: data.weather[0].icon
                }    
            return city
        }else{
            return "city not found"
        }
    }
    


    saveCity = function (cityName) {        
        let city = this.cityData.find(c => c.name === cityName) 
        $.post('/city', city)
    }


    removeCity = function (cityName) {
        $.ajax({
            type: "DELETE",
            url: `/city/${cityName}`,
            success: function (data) {
                console.log(data)
            },
            error: function (data) {
                console.log('Error:', data);
            }
        })
    }
}
