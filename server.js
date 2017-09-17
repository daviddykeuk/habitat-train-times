'use strict';
var express = require('express');
var app = express();
var server = require("http").createServer(app);
const Transportapi = require('./lib/transport-api');
const trainMonitor = require('./src/train-monitor');
const api = require('./src/api');

var jetstream = require('jetstream-microservice');

var port = process.env.PORT || 8101;

var options = {
    name: "train-monitor",
    location: process.env.serviceLocation || "http://localhost:" + (process.env.PORT || port),
    registry_url: process.env.regUrl,
    jwt_secret: process.env.JWTSecret,
    amqpHost: process.env.amqpHost
}

jetstream.init(app, options);

var transportApiCredentials = {
    baseUri: "http://transportapi.com/v3",
    appId: process.env.TRANSPORTAPI_APP_ID,
    apiKey: process.env.TRANSPORTAPI_API_KEY
};

var transportApi = new Transportapi(transportApiCredentials);

trainMonitor({ transportApi: transportApi, eventEmitter: jetstream.events, stationCode: process.env.STATION_CODE });

api({ app: app });

server.listen(port);