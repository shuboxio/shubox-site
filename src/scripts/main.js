/* global $ */

$('#menu-toggle').on('click', function () {
  $('.main-nav').slideToggle()
})

// ============================================================
// Sticky Subnav
// ============================================================

function sticky (el) {
  var elem = document.querySelector(el)
  var sticky = document.getElementById('sticky')
  if (elem.offsetTop <= window.scrollY) {
    sticky.classList.add('-stuck')
  } else {
    sticky.classList.remove('-stuck')
  }
}

window.addEventListener('scroll', function (e) {
  sticky('.layout-subnav')
})