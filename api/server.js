const Joi = require('joi')
const bodyParser = require('body-parser')
const _ = require('lodash')

const apiServer = app => {
  app.use(bodyParser.json({limit: '1mb'}))
  
  app.post('/api/get-quote', (req, res) => {
    const data = req.body
    const schema = {
      platforms: Joi.array(),
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      message: Joi.string().required(),
      budget: Joi.string(),
      attachment: Joi.string()
    }

    const validate = Joi.validate(data, schema)
    if (validate.error) {
      const error = _.head(validate.error.details).message
      return res.status(422).json(error)
    }
    
    res.json(true)
  })
}

module.exports = apiServer
