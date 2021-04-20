const request = require('request'); 

//weatherapi.com
const forecast = (latitude, longitude, callback) =>{

    const API_Key = 'e0936fcd61004062aa940239211704';
    var query = latitude + ',' + longitude; 
    const url = 'http://api.weatherapi.com/v1/current.json?' + 'key=' + API_Key + '&q=' + query + '&aqi=no';

    //only one of error and response will contain a value, undefined otherwise 

    //request callback function 
    
    /*
    url internally runs as url : url
    {body} uses destructuring, takes body = response.body 
    */
    request({ url , json : true}, (error, {body}) => {
        if(error)
        {
            callback(' Unable to connect to weather services ', undefined); 
        }

        else if(body.error) 
        {
            callback(' Unable to search find location. Try another location ', undefined); 
        }

        else
        {
            callback(undefined, body.current); 
        }
    })

}

module.exports = {
    forecast
}; 