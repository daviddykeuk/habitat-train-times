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
        if (train.status = 'LATE') {
            lateTrains.push(train);
        } else if (train.status = 'CANCELLED') {
            cancelledTrains.push(train);
        } else {
            onTimeTrains.push(train);
        }

        // is there a last set of trains?
        if (global.lastTrains) {
            // look for the train in the last set of trains where the status is different from before
            // if found add to the new arrays
            global.lastTrains.forEach((lastTrain) => {
                if (lastTrain.train_uid === train.train_uid && lastTrain.status != train.status) {
                    if (train.status = 'LATE') {
                        newLateTrains.push(train);
                    } else if (train.status = 'CANCELLED') {
                        newCancelledTrains.push(train);
                    } else {
                        newOntimeTrains.push(train);
                    }
                }
            });
        } else {
            // everything is new, so map
            newLateTrains = lateTrains;
            newOntimeTrains = onTimeTrains;
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