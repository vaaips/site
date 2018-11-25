import 'bootstrap'
import 'animate.css'
const wow = require('wowjs')
const anchorScroll = require("anchor-scroll")

anchorScroll.init({
  updateUrl: false,
  offset: 0,
  duration: 1000
})

new wow.WOW().init()