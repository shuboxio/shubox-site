/* global $, hljs */

var scrolled = false;

window.addEventListener('scroll', function(e) {
  var smallChatId = document.body.dataset.smallChatId;
  if(scrolled || smallChatId == "123") { return }

  var script = document.createElement("script")
  script.src = "https://embed.small.chat/"+ smallChatId +".js"
  document.body.appendChild(script);

  // force smallchat to load
  setTimeout(function(){ dispatchEvent(new Event('load')) }, 500)

  scrolled = true;
});
