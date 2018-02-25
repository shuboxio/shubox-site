/* global $, hljs */

window.onload = function () {
  // ============================================================
  // Debounce
  // ============================================================

  function debounce (func, wait, immediate) {
    var timeout
    return function () {
      var context = this
      var args = arguments
      var later = function () {
        timeout = null
        if (!immediate) func.apply(context, args)
      }
      var callNow = immediate && !timeout
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
      if (callNow) func.apply(context, args)
    }
  }

  // ============================================================
  // Sticky Subnav
  // ============================================================

  function sticky (el) {
    var scrollAmount = $(document).scrollTop() - $('.subnav').offset().top
    var stickyZone = $('.subnav').offset().top <= $(window).scrollTop()
    var stickyScreenSize = window.matchMedia('(min-width: 800px)').matches

    if (stickyZone && stickyScreenSize) {
      $('#sticky').animate({
        'marginTop': scrollAmount + 'px'
      }, 200)
    } else {
      $('#sticky').css({
        'marginTop': 0
      })
    }
  }

  var debouncedSticky = debounce(function () {
    sticky('.layout-subnav')
  }, 250)

  function initalizeStickyNav () {
    var hasSticky = document.querySelectorAll('#sticky')
    if (hasSticky.length) {
      window.addEventListener('scroll', function (e) {
        debouncedSticky()
      })
    }
  }

  initalizeStickyNav()
  hljs.initHighlighting()

  // ============================================================
  // Folding Nav
  // ============================================================

  $('.folding-header').on('click', function () {
    $(this).toggleClass('rotate-arrow').next('.folding-links').slideToggle()
  })

  // ============================================================
  // Fall back to png's & jpg's for browsers without WEBP support
  // ============================================================

  var WEBPs = document.querySelectorAll(".no-webp img[src$='.webp']")

  for (var i = 0; i < WEBPs.length; i++) {
    WEBPs[i].src = WEBPs[i].src.replace('.webp', '')
  }
}
