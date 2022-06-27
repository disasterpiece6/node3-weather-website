const request = require('request')

const geocode = (address, country, callback) => {
    const url = 'http://api.positionstack.com/v1/forward?access_key=3afd6b85006efdab58c18f5bf069cf2f' + '&query=' + address + '&country=' + country
    request({ url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.data === undefined) {
            callback('Unable to find location. Try another search', undefined)
        } else {
            callback(undefined, {
                latitude: body.data[0].latitude,
                longitude: body.data[0].longitude,
                location: body.data[0].locality
            })
        }
    })
}

module.exports = geocode