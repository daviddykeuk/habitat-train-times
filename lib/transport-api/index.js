const assert = require('assert');
const request = require('request');

var TransportAPI = function(args) {
    // requires base transport api url
    // requires an app_id
    // requires an api_key

    assert(args.baseUri && args.appId && args.apiKey, "baseUri, appId and apiKey are required");
    this.baseUri = args.baseUri;
    this.appId = args.appId;
    this.apiKey = args.apiKey;
}

TransportAPI.prototype.getDepartures = function(args) {
    var self = this;
    return new Promise(function(fulfill, reject) {
        // requires a station code
        if (!args.stationCode) {
            reject("Station Code not provided")
        } else {

            var url = self.baseUri +
                '/uk/train/station/' +
                args.stationCode +
                '/live.json?app_id=' +
                self.appId +
                '&app_key=' +
                self.apiKey;

            request(url, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    fulfill(JSON.parse(result.body));
                }
            });

        }
    });


}

module.exports = TransportAPI