const assert = require('assert');

const helpers = require('../helpers');
const trainProcesser = require('../../src/train-monitor/process-train-results');

describe('Processing train results...', () => {
    describe('Standard list of trains', () => {
        it('An array containing 12 late trains should return 12 late trains', () => {
            var processed = trainProcesser(helpers.liveStationResponse);
            assert(processed.lateTrains.length === 12);

        });
        it('An array containing no late trains should return no late trains', () => {

        });
    });

    describe('A invalid list of trains', () => {
        it('Should return an error', () => {

        });
    });

    describe('A empty list of trains', () => {
        it('Should return an error', () => {

        });
    });
});