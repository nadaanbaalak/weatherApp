const request  =require('request');
const geoCode = (address,callbackFunction)=>{
    const addressEncoded = encodeURIComponent(address);
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${addressEncoded}.json?access_token=pk.eyJ1IjoibmFkYWFuYmFhbGFrIiwiYSI6ImNrNW9kYWJwMzBmaWozb21wYnQ2aHBkc2gifQ.VolB0Nj6AcgK5JTDmZ1-PQ&limit=1`;
    request({url:url,json:true}, (error,response)=>{
        if(error)
        {
            callbackFunction(`Can't connect to Geo location Services`,undefined);
        }
        else if(response.body.features.length==0)
        {
            callbackFunction(`Can't find the Place`,undefined);
        }
        else{
            callbackFunction(undefined,{
                lat:response.body.features[0].center[1],
                long:response.body.features[0].center[0],
                cityName:response.body.features[0].place_name
            });
        }
    })
};
module.exports = geoCode
 