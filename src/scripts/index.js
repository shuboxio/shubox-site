/* global $, hljs */

window.addEventListener("load", function () {
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
});
