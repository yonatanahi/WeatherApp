const express = require('express')
var request = require('request');
const router = express.Router()

const City = require('../model/City')

const APIKEY = '5efadde743d81f366809fde1733fd8c3'

router.get('/city/:cityName', function(req, res){
    let cityName = req.params.cityName
    request(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${APIKEY}&units=metric`, 
    function(err, result){           
        result = JSON.parse(result.body)
        // console.log(result);
        
        res.send(result)
    })
})

router.get('/cities', function(req, res){
    City.find({}, function (err, cities) {
        res.send(cities)
    })
})

router.post('/city', function(req, res){
    let cityData = req.body    
    let city = new City(cityData)
    city.save()
    res.send(city)
})

router.delete('/city/:cityName', function(req, res){
    let cityName = req.params.cityName
    City.deleteOne({ name: cityName }, function(err, city){
        res.send(cityName + ' was deleted')
    });

})

module.exports = router