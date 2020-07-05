/* global $, hljs */

window.onload = function () {

  // ============================================================
  // Upload Shubox dropzone'age
  // =================================================
  new Shubox("#upload", {
    key: "03457406",
    maxFiles: 1,
    transformName: 'blog-large-image',
    previewsContainer: false,
    success: function (shuboxFile) {
      var upload = document.getElementById("upload");
      upload.innerHTML = '![]('+ shuboxFile.s3url +')';
    },
    transformCallbacks: {
      "544.webp": function(shuboxFile) {
        var upload = document.getElementById("upload");
        upload.innerHTML = '![]('+ shuboxFile.transforms["544.webp"].s3url +')';
      }
    }
  })

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

  function pricingAnchor () {
    if(window.location.pathname == "/") {
      var el = document.querySelector(".main-nav a[href='/pricing']")
      el.addEventListener("click", function(e){
        e.preventDefault()
        window.location.href = "#plans-pricing"
      })
    }
  }

  function newsletterTrack () {
    var subscribeForm = document.getElementById('mc-embedded-subscribe-form')
    subscribeForm.addEventListener("submit", function(e){
      var email = e.target.querySelector("input.email").value

      if (email !== "") {
        mixpanel.track("Subscribed to Newsletter", { email: email })
      }
    })
  }

  newsletterTrack()
  pricingAnchor()
  initalizeStickyNav()
  hljs.initHighlighting()

  // ============================================================
  // Folding Nav
  // ============================================================

  $('.folding-header').on('click', function () {
    $(this).toggleClass('rotate-arrow').next('.folding-links').slideToggle()
  })
}
