const express = require('express')
var cors = require('cors')
var Influx = require("influx")
var path = require('path')
var secrets = require('./secrets.js')

const app = express()

const influxHost = secrets.InfluxDB 
const databaseName = secrets.DBName

//port the app is currently serving to
const port = 6970

const influx = new Influx.InfluxDB({
    host: influxHost,
    database: databaseName
})

app.get('/api', function (req, res) {
    influx.query(`
    SELECT * 
    FROM "arduino_sensors"."autogen"."environment" 
    order by time desc 
    limit 1
    `).then(result => {
      res.json(result)
    }).catch(err => {
      res.status(500).send(err.stack)
    })
  })

app.use(cors());

app.get('/', function(req, res) {
  res.status(200).sendFile(path.join(__dirname + '/../html/index.html'));
});

app.get('/styles/styles.css', function(req, res) {
  res.sendFile(path.join(__dirname + '/../html/styles/styles.css'));
});

app.use(function (req, res) {
  res.status(404).sendFile(path.join(__dirname + '/../html/404.html'));
  res.status(404).sendFile(path.join(__dirname + '/../html/styles/styles.css'));
})

const server = app.listen(port, () => console.log(`ArduinoSensorsAPI app listening on port ${port}!\n`))

module.exports = server
