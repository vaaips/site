const Joi = require('joi')
const bodyParser = require('body-parser')
const _ = require('lodash')
const SparkPost = require('sparkpost')

const apiServer = app => {
  app.use(bodyParser.urlencoded({ extended: false }))
  
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

    const client = new SparkPost(process.env.SPARKPOST_API_KEY)
    const send = client.transmissions.send({
      options: {
        sandbox: true
      },
      content: {
        from: data.email,
        subject: `${data.name} Requested for Quote - Vaaip`,
        attachments: data.attachment ? data.attachment : null,
        html: `
          <html>
            <body>
              <p>${data.name} (${data.email})</p>
              <p>
                ${data.message}<br>
                Budget: ${data.budget}<br>
                Platforms: data.platforms
              </p>
            </body>
          </html>`
      },
      recipients: [
        { address: process.env.EMAIL }
      ]
    })
    
    send.then(data => res.json('Thanks! We\'ll get back to you soon'))
      .catch(error => res.status(403).json('Whoops! Something went wrong'))
  })
}

module.exports = apiServer
