const assert = require('assert');
const Transportapi = require('../../lib/transport-api');
const helpers = require('../helpers');

describe('Transport API tests', () => {
    describe('Initialisation tests', () => {

        it('Should initialise with all arguments', () => {
            var transportapi = new Transportapi(helpers.workingTransportApiArgs);
            assert(transportapi, "a new class should be created");
        });

        it('Should not initialise without a base url', () => {
            let args = {
                appId: "anappid",
                apiKey: "anapikey"
            }
            assert.throws(() => {
                var transportapi = new Transportapi(args);
            }, Error, "Error thrown");
        });

        it('Should not initialise without an app id', () => {
            let args = {
                baseUri: "baseuri",
                apiKey: "anapikey"
            }
            assert.throws(() => {
                var transportapi = new Transportapi(args);
            }, Error, "Error thrown");
        });

        it('Should not initialise without an api key', () => {
            let args = {
                baseUri: "baseuri",
                appId: "anappid",
            }
            assert.throws(() => {
                var transportapi = new Transportapi(args);
            }, Error, "Error thrown");
        });

        it('Should not initialise without any args', () => {
            assert.throws(() => {
                var transportapi = new Transportapi();
            }, Error, "Error thrown");
        });
    });

    describe('Get Departures tests', () => {
        // we need a helper here to stub external api calls

        describe('Working app id and api key', () => {
            it('Should return some data', () => {
                var transportapi = new Transportapi(helpers.workingTransportApiArgs);
                return transportapi.getDepartures({ stationCode: "MKC" }).then((trains) => {
                    console.log(trains);
                });

            });
        });

        describe('Wrong app id or api key', () => {
            it.skip('Should return an error', () => {

            });
        });

        describe('Wrong base url', () => {
            it.skip('Should return an error', () => {

            });
        });
    });
});