const chakram = require('chakram'),
      expect = chakram.expect;
const LocationSearch = require('../lib/LocationSearch');
const Location = require('../lib/Location');

var closestIndexTo = require('date-fns/closest_index_to')

describe("Metaweather API methods", () => {
  before(function()  {
   locationSearch = new LocationSearch
   location = new Location
  });

  it("should find san franciso by query", () => {
    locationSearch.byQuery("San Francisco")
    .then((data) => {
      expect(data.latt_long).to.equal("37.777119, -122.41964")
      expect(data.title).to.equal("San Francisco")
      expect(data.location_type).to.equal("City")
    });
  });

  it("should find san franciso by lattlong", () => {
    locationSearch.byLattLong("37.777119, -122.41964")
    .then((data) => {
      expect(data.latt_long).to.equal("37.777119, -122.41964")
      expect(data.title).to.equal("San Francisco")
      expect(data.location_type).to.equal("City")
    });
  });

  it("should find san francisco by woeid and print weather state, wind speed and current temperature", async () => {
    const { body: [{ woeid }]  } = await locationSearch.byQuery("San Francisco")
    location.getWeather(woeid)
    .then(({ body }) => {
      expect(body.latt_long).to.equal("37.777119, -122.41964")
      expect(body.title).to.equal("San Francisco")
      expect(body.location_type).to.equal("City")
      console.log(`There is ${body.consolidated_weather[0].weather_state_name} in San Francisco now`)
      console.log(`Wind speed is ${body.consolidated_weather[0].wind_speed} in San Francisco now`)
      console.log(`Current temperature is ${body.consolidated_weather[0].the_temp} in San Francisco now`)
    });
  });

  it("should find Bucharest by woeid and print weather state, wind speed and temperature for the date of 17-05-2017 at 14:23", async () => {
    const { body: [{ woeid }]  } = await locationSearch.byQuery("Bucharest")
    location.getWeather(woeid, '2017/05/17')
    .then(({ body}) => {
      date_arrays = body.map(({ created }) =>  created)
      selectedIndex =  closestIndexTo("2017-05-17T14:23:00Z", date_arrays)
      var weather = body[selectedIndex]
      console.log(`There was ${weather.weather_state_name} in Bucharest for the date of 17-05-2017 at 14:23`)
      console.log(`Wind speed was ${weather.wind_speed} in Bucharest for the date of 17-05-2017 at 14:23`)
      console.log(`Temperature was ${weather.the_temp} in Bucharest for the date of 17-05-2017 at 14:23`)
    });
  });
});
