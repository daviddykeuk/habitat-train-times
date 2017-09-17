const assert = require('assert');

module.exports = function(args) {
    // requires the express app to create an endpoint
    assert(args.app);
    var app = args.app;

    // GET /trains - returns a list of departures from process.env.STATION_CODE station
    app.get('/departures', (req, res) => {
        res.send(global.departures);
    });

}