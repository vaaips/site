import $ from 'jquery'
import _ from 'lodash'
import axios from 'axios'

const getQuoteForm = {
  data: {
    platforms: [],
    name: '',
    email: '',
    message: '',
    budget: '',
    attachment: {}
  },

  onTogglePlatform() {
    $('.modal [platform]').click(function() {
      const isActive = $(this).hasClass( "active" )
      isActive ? $(this).removeClass('active') : $(this).addClass('active')
    })
  },

  collect() {
    const self = this
    self.data.platforms = []

    $('.modal [platform]').each( function() {
      const hasActive = $(this).hasClass('active')
      const platform = $(this).attr('platform')
      if (hasActive) self.data.platforms.push(platform)
    })

    self.data.name = $('[name=name]').val()
    self.data.email = $('[name=email]').val()
    self.data.message = $('[name=message]').val()
    self.data.budget = $('[name=budget]').val()
    return this.data
  },

  onAttachmentChange() {
    const self = this
    $('[name=attachment]').change(function() {
      const files = $(this).prop('files')
      if (files.length ) {
        const fileReader = new FileReader()
        const file = files[0]

        fileReader.onload = function() {
          self.data.attachment = {
            data: fileReader.result.split(',')[1],
            name: file.name,
            type: file.type
          }
        }
        fileReader.readAsDataURL(file)
      }
    })
  },

  onSubmit() {
    const self = this
    $('.modal button').click(function() {
      self.alertController.clearAll()

      axios.post('/api/get-quote', self.collect())
        .then(response => self.alertController.success(response.data))
        .catch(error => self.alertController.error(error.response.data))
    })
  },

  alertController: {
    clearAll() {
      $('.modal .alert').removeClass('alert-danger')
      $('.modal .alert').removeClass('alert-success')
    },

    error(message) {
      $('.modal .alert').addClass('alert-danger')
      $('.modal .alert').removeClass('alert-success')
      $('.modal .alert').text(message)
    },

    success(message) {
      $('.modal .alert').addClass('alert-success mb-0')
      $('.modal .alert').removeClass('alert-danger')
      $('.modal .alert').text(message)
      $('.form-wrapper').css('display', 'none')
    }
  },

  init() {
    this.onTogglePlatform()
    this.onAttachmentChange()
    this.onSubmit()
  }
}

export default { getQuoteForm }