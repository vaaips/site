const Joi = require('joi')
const bodyParser = require('body-parser')
const _ = require('lodash')
const SparkPost = require('sparkpost')

const apiServer = app => {
  app.use(bodyParser.json({limit: '10mb'}))
  
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
      from: {
        name: data.name,
        email: process.env.FROM_EMAIL
      },
      reply_to: data.email,
      subject: `Quotation Request - Vaaip`,
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
      recipients: [{
        address: {
          name: 'Vaaip Software Studio',
          email: process.env.TO_EMAIL
        } 
      }]
    })
    
    send.then(data => res.json('Thanks! We\'ll get back to you soon'))
      .catch(error => res.status(403).json(`Whoops! Something went wrong! ${ data.attachment.name ? 'Might be the attachment size more than 10MB' : '' }`))
  })
}

module.exports = apiServer
