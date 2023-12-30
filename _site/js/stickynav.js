window.addEventListener("load", function(){
  debugger
  var threshold = document.querySelector('.threshold');
  var nav = document.querySelector('.subnav nav');
  var handler = function(entries) {
    debugger
    if (!entries[0].isIntersecting) {
      nav.classList.add('stuck')
    } else {
      nav.classList.remove('stuck')
    }
  }
  var observer = new window.IntersectionObserver(handler);
  observer.observe(threshold);
})