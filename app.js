const express = require('express')
require('dotenv').config()
const apiServer = require('./api/server')
const clientServer = require('./client/server')

const app = express()
const port = process.env.SERVER_PORT

apiServer(app)
clientServer(app)

app.listen(port, () => console.log(`Serving on port ${port}`))