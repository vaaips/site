const path = require('path')
const express = require('express')

const app = express()
const port = process.env.PORT
const publicPath = path.join(__dirname, './dist')

app.use(express.static(publicPath))
app.listen(port)