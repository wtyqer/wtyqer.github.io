var e = function(selector) {
  return document.querySelector(selector)
}

var es = function(selector) {
    return document.querySelectorAll(selector)
}

var bindEvent = function(element, elementName, callback) {
  element.addEventListener(elementName, callback)
}

var find = function(element, selector) {
    return element.querySelector(selector)
}

var findAll = function(element, selector) {
    return element.querySelectorAll(selector)
}

var removeClassAll = function(className) {
    var selector = '.' + className
    var elements = document.querySelectorAll(selector)
    for (var i = 0; i < elements.length; i++) {
        var e = elements[i]
        e.classList.remove(className)
    }
}

var index = 0
var timer = null

var changImg = function() {
  var slides = getSlides()
  var dots = getDots()

  var slideActive = 'slide-active'
  removeClassAll(slideActive)
  slides[index].classList.add(slideActive)

  var dotActive = 'dot-active'
  removeClassAll(dotActive)
  dots[index].classList.add(dotActive)
}

var getSlides = function() {
  var banner = e('#banner')
  var slides = findAll(banner, 'div')
  return slides
}

var getDots = function() {
  var indicator = e('#dots')
  var dots = findAll(indicator, 'span')
  return dots
}

var bindEventNext = function() {
  var next = e('#next')
  bindEvent(next, 'click', function() {
    var dots = getDots()
    index++
    index = index % dots.length
    changImg()
  })
}

var bindEventPrev = function() {
  var prev = e('#prev')
  bindEvent(prev, 'click', function() {
    var dots = getDots()
    index--
    index = (index + dots.length) % dots.length
    changImg()
  })
}

var bindEventDots = function() {
  var dots = getDots()
  for (var i = 0; i < dots.length; i++) {
    var dot = dots[i]
    dot.setAttribute('data-id', i)
    bindEvent(dot, 'click', function() {
      index = this.getAttribute('data-id')
      changImg()
    })
  }
}

var bindEventMain = function() {
  var main = e('#main')
  bindEvent(main, 'mouseover', stopAutoPlay)
  bindEvent(main, 'mouseout', startAutoPlay)
}

var startAutoPlay = function() {
  timer = setInterval(function() {
    var dots = getDots()
    index++
    index = index % dots.length
    changImg()
  }, 3000)
}

var stopAutoPlay = function() {
  if (timer) {
    clearInterval(timer)
  }
}

var __main = function() {
  startAutoPlay()
  bindEventNext()
  bindEventPrev()
  bindEventDots()
  bindEventMain()
}

__main()
