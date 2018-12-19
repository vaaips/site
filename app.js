const path = require('path')
const express = require('express')
const app = express()

const clientBuild = path.join(__dirname, './client/dist')
app.use(express.static(clientBuild))

app.listen(80, () => console.log('Serving on port 80'))