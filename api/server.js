const Joi = require('joi')
const bodyParser = require('body-parser')
const _ = require('lodash')
const SparkPost = require('sparkpost')

const apiServer = app => {
  app.use(bodyParser.json({limit: '1mb'}))
  
  app.post('/api/get-quote', (req, res) => {
    const data = req.body
    const schema = {
      platforms: Joi.array().allow([]),
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      message: Joi.string().required(),
      budget: Joi.string().allow(''),
      attachment: Joi.object().allow({})
    }

    const validate = Joi.validate(data, schema)
    if (validate.error) {
      const error = _.head(validate.error.details).message
      return res.status(422).json(error)
    }

    const client = new SparkPost(process.env.SPARKPOST_API_KEY)
    const content = {
      from: process.env.FROM_EMAIL,
      subject: `${data.name} Requested for Quote - Vaaip`,
      html: `
        <html>
          <body>
            <p>${data.name} (${data.email})</p>
            <p>
              ${data.message}<br>
              Budget: ${data.budget}<br>
              Platforms: ${data.platforms}
            </p>
          </body>
        </html>`
    }
    if (!_.isEmpty(data.attachment)) content.attachments = [data.attachment]

    const send = client.transmissions.send({
      content,
      recipients: [
        { address: process.env.TO_EMAIL }
      ]
    })
    
    send.then(data => res.json('Thanks! We\'ll get back to you soon'))
      .catch(error => res.status(403).json('Whoops! Something went wrong'))
  })
}

module.exports = apiServer
