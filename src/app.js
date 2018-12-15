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
  $(document).on('click', '.nav-item', function() {
    $(".nav-item").removeClass("active");
    $(this).addClass("active");
  });
})