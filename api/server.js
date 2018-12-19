const apiServer = app => {
  app.get('/api', (req, res) => {
    res.json({ api: true })
  })
}

module.exports = apiServer
