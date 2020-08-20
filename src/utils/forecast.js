const request = require("request");

const forecast = (location, callback) => {
  url =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    location +
    "&appid=54b3d3252c8b9b23b27ce1b83fdbcb02";

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("unable to connect to weather service", undefined);
    } else if (body.message && body.cod) {
      callback("undable to find location", undefined);
    } else {
      callback(
        undefined,
        "It is Currently " +
          body.main.temp +
          " out. With max temp of: " +
          body.main.temp_max +
          ". Wind speed of " +
          body.wind.speed +
          " at " +
          body.wind.deg +
          " degrees"
      );
    }
  });
};

module.exports = forecast;
