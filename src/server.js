const express = require('express')
var cors = require('cors')
var Influx = require("influx")
var path = require('path')

const app = express()

const influxHost = "192.168.0.22:8086"
const databaseName = "Arduino_Sensors"

//port the app is currently serving to
const port = 6970
var content

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
    res.status(200).send("ArduinoSensorsAPI")
});

const server = app.listen(port, () => console.log(`ArduinoSensorsAPI app listening on port ${port}!\n`))

module.exports = server
