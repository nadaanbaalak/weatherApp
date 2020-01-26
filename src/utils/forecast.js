const request = require('request');
const forecast = (long,lat,cityName,callbackFunction)=>{
    const url = `https://api.darksky.net/forecast/ce40613879f3163a09deb22ee4740877/${lat},${long}?units=si`
    request({url:url,json:true},(error,response)=>{
        if(error)
        {
            callbackFunction(`Weather Services can't be reached now`, undefined);
        }
        else if(response.body.error)
        {
            callbackFunction(`Invalid Coordinates`,undefined);
        }
        else{
            let summary = response.body.currently.summary
            let currentTemp = response.body.currently.temperature;
            let rainProbability = response.body.currently.precipProbability;
            let str = {
                summary : summary,
                currentTemp : currentTemp,
                rainProbability:rainProbability,
                cityName:cityName
            }
            callbackFunction(undefined,str);
        }
    })
}

module.exports = forecast;