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

var scrolled = false;

window.addEventListener('scroll', function(e) {
  var smallChatId = document.body.dataset.smallChatId;
  if(scrolled || smallChatId == "123") { return }

  var script = document.createElement("script")
  script.src = "https://embed.small.chat/"+ smallChatId +".js"
  script.async = true
  script.defer = true
  document.body.appendChild(script);

  scrolled = true;
});
