const chakram = require('chakram')

module.exports = class Location {
  //executing get request to location or location day api methods depends on params
  //@param <String> woeid where on earh id
  //@param <String> date day in "2013/4/30/" format. Is optional
  //return <Promise>
  getWeather(woeid, date ="") {
    return chakram.get(`https://www.metaweather.com/api/location/${woeid}/${date}`)
  }
}
