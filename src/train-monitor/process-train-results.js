const assert = require('assert');
module.exports = function(results) {
    assert(results && results.departures && results.departures.all);

    var lateTrains = [];
    var onTimeTrains = [];
    results.departures.all.forEach((train) => {
        if (train.status = 'LATE') {
            lateTrains.push(train);
        } else {
            onTimeTrains.push(train);
        }
    });

    return {
        lateTrains: lateTrains,
        onTimeTrains: onTimeTrains
    }
};