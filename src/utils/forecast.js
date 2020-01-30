const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/9c2fc8d00af1653b974d912ea9c4e4e6/${latitude},${longitude}?units=si`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to the weather service!', undefined);
    } else if (body.error) {
      callback('Unable to find location', undefined);
    } else {
      const {
        currently: { temperature, precipProbability },
        daily: { data: dailyData },
      } = body;

      const forecastString =
        dailyData[0].summary +
        ` It is currently ${temperature} degrees out. The maximum temperature for the day is going to be ${dailyData[0].temperatureMax}°C and we will have a minimum of ${dailyData[0].temperatureMin}°C. There is a ${precipProbability}% chance of rain.`;

      callback(undefined, forecastString);
    }
  });
};

module.exports = forecast;
