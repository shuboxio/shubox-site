/* global $ */

$('#menu-toggle').on('click', function () {
  $('.main-nav').slideToggle()
})

// ============================================================
// Sticky Subnav
// ============================================================

function sticky (el) {
  var elem = document.querySelector(el)
  var scrollStop = document.querySelector('main')
  var sticky = document.getElementById('sticky')
  var scrollActive = elem.offsetTop <= window.scrollY
  var scrollBottom = window.scrollY + sticky.offsetHeight >= scrollStop.scrollHeight

  if (scrollBottom) {
    sticky.classList.remove('-stuck')
    sticky.classList.add('-stuck-bottom')
  } else if (scrollActive && !scrollBottom) {
    sticky.classList.add('-stuck')
    sticky.classList.remove('-stuck-bottom')
  } else {
    sticky.classList.remove('-stuck', '-stuck-bottom')
  }
}

function initalizeStickyNav () {
  var hasSticky = document.querySelectorAll('#sticky')
  if (hasSticky.length) {
    window.addEventListener('scroll', function (e) {
      sticky('.layout-subnav')
    })
  }
}

document.addEventListener('DOMContentLoaded', initalizeStickyNav)