const assert = require('assert');

module.exports = function(results) {
    assert(results && results.departures && results.departures.all);
    var bufferMinutes = process.env.MINUTES_TO_BE_LATE || 0;
    if (bufferMinutes === 0) {
        return results;
    } else {
        results.departures.all.forEach((train) => {
            if (train.status === "LATE") {
                var howLate = parseInt(train.expected_departure_time.replace(":", "")) - parseInt(train.aimed_departure_time.replace(":", ""));
                if (howLate <= bufferMinutes) {
                    train.status = "SLIGHTLY LATE"
                }
            }
        });
        return results;
    }
}