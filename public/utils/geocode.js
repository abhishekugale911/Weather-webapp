const request = require("postman-request");
const keyGeo =
  "pk.eyJ1Ijoic2V2ZXJ1c2RldmRhcmsiLCJhIjoiY2tvY211ajFoM2IyczJwbHB5Mms0ZmpsaCJ9.J-WjOBfhd9NsKz3uX_IH0w";

const geocode = function (address, callback) {
  const urlGeocode = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?limit=1&access_token=${keyGeo}`;

  request({ url: urlGeocode, json: true }, (error, response) => {
    if (error) {
      callback("Cannot connect with the Geocode API.", undefined);
      return;
    } else if (response.body.features.length === 0) {
      callback(
        "Cannot get coordinates of your location using Geocode.",
        undefined
      );
      return;
    }

    callback(undefined, {
      latitude: response.body.features[0].center[1],
      longitude: response.body.features[0].center[0],
      location: response.body.features[0].place_name,
    });
  });
};

module.exports = geocode;