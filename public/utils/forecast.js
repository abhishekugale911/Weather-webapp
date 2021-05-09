const request = require("postman-request");
const keyWeather = "990639cdd84ba8d3f70402505fa6a494";

const forecast = function (helperObj, callback) {
  const urlWeather = `http://api.weatherstack.com/current?access_key=${keyWeather}&query=${helperObj.latitude},${helperObj.longitude}`;
  request({ url: urlWeather, json: true }, (error, response) => {
    if (error) {
      // console.log('Cannot connect to the weather API.');
      callback("Cannot connect to the weather API.", undefined);
      return;
    } else if (response.body.error) {
      // console.log('Cannot get weather of that location');
      callback("Cannot get weather of that location", undefined);
      return;
    }
    const body = response.body;
    const result = {
      location: helperObj.location,
      weather_descriptions: body.current.weather_descriptions[0],
      temperature: body.current.temperature,
      speed: body.current.wind_speed,
    };
    callback(undefined, result);
  });
};

module.exports = forecast;
