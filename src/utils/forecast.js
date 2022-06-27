const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=9a1315eb4b26e8bc65bdbce6aaf68a31&query=' + latitude + ',' + longitude
    request({ url, json: true}, (error, {body}) => {

        if(error){
            callback(error, undefined)
        } else if(body.error){
            callback('Unable to find location. Please check coordinates!', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + ". The temperature is currently " + body.current.temperature + " degrees and the probability for rain is " + body.current.precip + "%")
        }
    })
}

module.exports = forecast