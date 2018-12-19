const express = require('express')
const apiServer = require('./api/server')
const clientServer = require('./client/server')

const app = express()
const port = 8000

apiServer(app)
clientServer(app)

app.listen(port, () => console.log(`Serving on port ${port}`))