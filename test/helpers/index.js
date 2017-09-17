exports.workingTransportApiArgs = {
    baseUri: "http://transportapi.com/v3",
    appId: process.env.TRANSPORTAPI_APP_ID,
    apiKey: process.env.TRANSPORTAPI_API_KEY
};

exports.liveStationResponse = require('./liveStationResponse');