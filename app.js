const express = require('express')

const app = express()
const port = process.env.SERVER_PORT
const publicPath = path.join(__dirname, './dist')

app.use(express.static(publicPath))
app.listen(port, () => console.log(`Serving on port ${port}`))