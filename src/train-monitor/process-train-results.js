const assert = require('assert');

module.exports = function(results) {
    assert(results && results.departures && results.departures.all);

    var lateTrains = [];
    var onTimeTrains = [];
    var cancelledTrains = [];
    var newLateTrains = [];
    var newOntimeTrains = [];
    var newCancelledTrains = [];

    results.departures.all.forEach((train) => {

        var howLate = parseInt(train.expected_departure_time.replace(":", "")) - parseInt(train.aimed_departure_time.replace(":", ""));
        var bufferMinutes = process.env.MINUTES_TO_BE_LATE || 0;

        if (train.status === 'LATE' && howLate > bufferMinutes) {
            lateTrains.push(train);
        } else if (train.status === 'CANCELLED') {
            cancelledTrains.push(train);
        } else {
            onTimeTrains.push(train);
        }

        // is there a last set of trains?
        if (global.lastTrains) {
            // look for the train in the last set of trains where the status is different from before
            // if found add to the new arrays
            var found = false;
            global.lastTrains.forEach((lastTrain) => {
                if (lastTrain.train_uid === train.train_uid) {
                    found = true;
                    if (lastTrain.status != train.status || lastTrain.expected_departure_time != train.expected_departure_time) {
                        console.log(howLate);
                        if (train.status === 'LATE' && howLate > bufferMinutes) {
                            newLateTrains.push(train);
                        } else if (train.status === 'CANCELLED') {
                            newCancelledTrains.push(train);
                        } else {
                            newOntimeTrains.push(train);
                        }
                    }
                }
            });
            if (!found) {
                if (train.status === 'LATE' && howLate > bufferMinutes) {
                    newLateTrains.push(train);
                } else if (train.status === 'CANCELLED') {
                    newCancelledTrains.push(train);
                }
            }
        } else {
            // everything is new, so map
            newLateTrains = lateTrains;
            newCancelledTrains = cancelledTrains;
        }

    });

    // store the trains in memory for next time
    global.lastTrains = results.departures.all;

    return {
        lateTrains: lateTrains,
        newLateTrains: newLateTrains,
        onTimeTrains: onTimeTrains,
        newOntimeTrains: newOntimeTrains,
        cancelledTrains: cancelledTrains,
        newCancelledTrains: newCancelledTrains
    }
};