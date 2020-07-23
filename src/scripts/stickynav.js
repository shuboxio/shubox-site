window.addEventListener("load", function(){
  var threshold = document.querySelector('.threshold');
  var nav = document.querySelector('.subnav nav');
  var handler = function(entries) {
    if (!entries[0].isIntersecting) {
      nav.classList.add('stuck')
    } else {
      nav.classList.remove('stuck')
    }
  }
  var observer = new window.IntersectionObserver(handler);
  observer.observe(threshold);
})
