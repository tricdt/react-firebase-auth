const initWebRoutes = require('./src/route/routes-config')
const functions = require("firebase-functions");
const admin = require('firebase-admin')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
admin.initializeApp()
const app = express()
// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(cors({ origin: true }));
// app.use(isAuthenticated)
initWebRoutes(app);



exports.api = functions.https.onRequest(app)
