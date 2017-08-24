'use strict'

// AppMetrics monitoring instrumentation
require('appmetrics-dash').attach();
const cfenv = require('cfenv');
const express = require('express');
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());

// Emulating VCAP_VARIABLES if running in local mode
try { require("./vcap-local"); } catch (e) {}
var appEnv = cfenv.getAppEnv();

// Health route
require('./routes/health')(app);




// Define public endpoints
app.use(express.static(__dirname + '/public'));

// Starting the server
const port = 'PORT' in process.env ? process.env.PORT : 8080;
app.listen(port, function () {
	const address = (this.address().address === '::') ? 'http://localhost' : this.address().address;
	const port = this.address().port;
	console.log(`devops listening on ${address}:${port}`)
});
