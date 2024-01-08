/* global $, hljs */

var scrolled = false;

var chatLoader = function() {
  var script = document.createElement("script")
  script.src = "https://embed.small.chat/"+ smallChatId +".js"
  document.body.appendChild(script);

  // force smallchat to load
  setTimeout(function(){ dispatchEvent(new Event('load')) }, 500)
}

var scrollHandler = function(e) {
  var nav = document.getElementById('nav-container');

  if (window.scrollY > 200) {
    nav.attributes.class.value = nav.attributes.class.value.replace('md:py-6', 'md:py-4');
  } else {
    nav.attributes.class.value = nav.attributes.class.value.replace('md:py-4', 'md:py-6');
  }

  var smallChatId = document.body.dataset.smallChatId;
  if(scrolled || smallChatId == "123") { return }

  chatLoader();
  scrolled = true;
}

window.addEventListener('scroll', scrollHandler);
