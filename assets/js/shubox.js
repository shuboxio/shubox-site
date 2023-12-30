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
  var nav = document.querySelector('.global-header');

  if (window.scrollY > 200) {
    nav.attributes.class.value = nav.attributes.class.value.replace('pv4', 'pv3');
  } else {
    nav.attributes.class.value = nav.attributes.class.value.replace('pv3', 'pv4');
  }

  var smallChatId = document.body.dataset.smallChatId;
  if(scrolled || smallChatId == "123") { return }

  chatLoader();
  scrolled = true;
}

window.addEventListener('scroll', scrollHandler);