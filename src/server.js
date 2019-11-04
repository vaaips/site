const path = require('path')
const express = require('express')

const clientServer = app => {
  const buildPath = path.join(__dirname, './dist')
  app.use(express.static(buildPath))
}

module.exports = clientServer