const request = require('request');

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiZHphcmFnIiwiYSI6ImNrNXkxdjNscTBmdXYzbW5qNHBjb3p5ZHEifQ.5864YnbksDsFWIbbd0HF6g&limit=1`;
  debugger;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to the location services', undefined);
    } else if (body.features.length === 0) {
      callback('Unable to find location. Try another search.', undefined);
    } else {
      const {
        place_name: location,
        center: [longitude, latitude],
      } = body.features[0];

      callback(undefined, {
        latitude,
        longitude,
        location,
      });
    }
  });
};

module.exports = geocode;
