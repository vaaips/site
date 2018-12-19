import $ from 'jquery'
import _ from 'lodash'

const getQuoteForm = {
  data: {
    platforms: [],
    name: '',
    email: '',
    message: '',
    budget: '',
    attachment: ''
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

    const files = $('[name=attachment]').prop('files')
    if (files.length) {
      var fileReader = new FileReader()
      fileReader.onload = function() {
        self.data.attachment = fileReader.result
      }
      fileReader.readAsDataURL(files[0])
    }

    return this.data
  },

  onSubmit() {
    const self = this
    $('.modal button').click(function() {
      console.log(self.collect())
    })
  },

  init() {
    this.onTogglePlatform()
    this.onSubmit()
  }
}

export default { getQuoteForm }