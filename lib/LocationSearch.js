const chakram = require('chakram')

module.exports = class LocationSearch {
  //executing get request with query parameter
  //@param <String> query name or part of
  //return <Promise>
  byQuery(query) {
    return chakram.get(`https://www.metaweather.com/api/location/search/?query=${encodeURI(query)}`)
  }
  //executing get request with query parameter
  //@param <String> coords coordinates in lattlong format e.g. "37.777119, -122.41964"
  //return <Promise>
  byLattLong(coords) {
    return chakram.get(`https://www.metaweather.com/api/location/search/?lattlong=${encodeURI(coords)}`)
  }
}
