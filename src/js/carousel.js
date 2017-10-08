export default class Carousel {
  constructor () {
    this.strip = document.getElementById('recommended')
    this.carousel = document.querySelector('.carousel')
    this.slides = document.querySelectorAll('.strip .card')
    this.pagers = []
    this.size = this.slides.length
    this.activeSlide = 0
    this.isMobile = window.matchMedia('only screen and (max-width: 760px)')
    this.isMobile = this.isMobile.matches
    this.slidesPerPage = this.isMobile ? 1 : 3

    this.renderPagers()

    this.strip.style.width = `${this.size * 309}px`
    this.pagers[this.activeSlide].classList.add('active')
  }

  renderPagers () {
    const pagerWrapper = document.createElement('div')
    pagerWrapper.classList.add('pager__wrapper')

    let pagers = Math.floor(this.size / this.slidesPerPage)

    if (this.size % 3 > 0) {
      pagers++
    }

    for (let i = 0; i < pagers; i++) {
      let pager = document.createElement('span')
      pager.classList.add('pager')
      pager.innerText = '●'
      pager.addEventListener('click', () => this.activePager(i), false)

      this.pagers.push(pager)
      pagerWrapper.appendChild(pager)
    }
    this.carousel.appendChild(pagerWrapper)
  }

  activePager (index) {
    this.pagers[this.activeSlide / this.slidesPerPage].classList.remove('active')
    this.activeSlide = index * this.slidesPerPage

    this.pagers[index].classList.add('active')
    this.strip.style.transform = `translateX(-${index * this.slidesPerPage * 309}px)`
  }
}
