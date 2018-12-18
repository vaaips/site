import 'bootstrap'
import 'animate.css'
import $ from 'jquery'
const wow = require('wowjs')
const anchorScroll = require("anchor-scroll")

anchorScroll.init({
  updateUrl: false,
  offset: 0,
  duration: 1000
})

new wow.WOW().init()

$(function() {
  var sections = $('section')
  var nav = $('.nav-item')
  var navHeight = nav.outerHeight()

  $(window).on('scroll', function () {
    var currentPosition = $(this).scrollTop()
    
    sections.each(function() {
      var top = $(this).offset().top - navHeight
      var bottom = top + $(this).outerHeight()

      if (currentPosition >= top && currentPosition <= bottom) {
        $('.nav-item').removeClass('active')
        nav.find('a[href="#'+$(this).attr('id')+'"]').parent().addClass('active')
      }
    })
  })

  $('[data-target]').click(function() {
    if($(this).hasClass( "active" )) {
      $(this).removeClass('active')
    }
    else {
      $(this).addClass('active')
    }
  })
})