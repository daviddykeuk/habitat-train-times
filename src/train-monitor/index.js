const assert = require('assert');
const trainProcessor = require('./process-train-results');

module.exports = function(args) {
    // requires a transport api and an event mechanism
    assert(args.transportApi && args.eventEmitter && args.stationCode);

    var run = function() {
        // check that it works
        args.transportApi.getDepartures({ stationCode: args.stationCode }).then((response) => {
            // create a timeout to check trains every X minutes

            // add the result in to memory to serve in the API
            global.departures = response;

            // process the results
            var processedTrains = trainProcessor(response);

            // emit events on the late trains
            processedTrains.lateTrains.forEach((train) => {
                args.eventEmitter.emit('train.late', train);
            });

            setTimeout(run, 60000);
        }).catch((err) => {
            console.log("error %s", err)
            setTimeout(run, 60000);
        })
    };

    run();

}