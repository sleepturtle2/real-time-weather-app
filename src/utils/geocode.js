const request = require ('request'); 


//Geocode 

//mapbox.com
const geocode = (address, callback) => {
    const API_Key = 'pk.eyJ1Ijoic2xlZXB0dXJ0bGUiLCJhIjoiY2tubGpia3FiMGxtdTJ4cG4yN3FyeXRyOSJ9.OpFznYLCaBSZ_lmpMMUdQA';

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=' + API_Key + '&limit=1';


    /*
    url internaly runs as url : url
    {body} uses destructuring, body = response.body
    */
    request({ url , json: true }, (error, {body}) => {
        if (error) {
            callback(' Unable to connect to location services ', undefined);
        }

        else if (body.features.length === 0) {
            callback(' Unable to find location. Try another search ', undefined);
        }

        else {
            var latitude = body.features[0].center[1];
            var longitude = body.features[0].center[0];
            var location = body.features[0].place_name; 

            callback(undefined, {
                latitude, 
                longitude, 
                location
            }); 
        }
    })
}


module.exports = {
    geocode
}; 