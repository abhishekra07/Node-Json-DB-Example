const express = require('express')
const { JsonDB } = require('node-json-db')
const { Config } = require('node-json-db/dist/lib/JsonDBConfig')

const app = express()
const PORT = process.env.PORT || 3200

const db = new JsonDB(new Config("JsonDB", true, false, '/'));

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(PORT, () => console.log(`server running on port ${PORT}`))
