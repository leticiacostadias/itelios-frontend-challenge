export default class Product {
  constructor (product, type) {
    this.id = product.businessId
    this.name = product.name.lenght > 85 ? `${product.name.substring(0, 86)}...` : product.name
    this.price = product.price
    this.image = this.getImage(product.imageName)
    this.conditions = this.getCondition(product.productInfo.paymentConditions)
    this.interest = product.productInfo.paymentConditions.toLowerCase().includes('com juro')
    this.type = type
  }

  getImage (src) {
    const imageName = src.substr(src.indexOf('imagens/') + 8, src.lenght)

    return `/images/${imageName}`
  }

  getCondition (string) {
    let init, end

    if (string.indexOf('ou até ') === 0) {
      init = 7
    } else if (string.indexOf('ou ') === 0) {
      init = 3
    } else {
      init = 0
    }

    if (string.indexOf(' sem juros')) {
      end = string.indexOf(' sem juros') - 7
    } else {
      end = string.lenght
    }

    return string.substr(init, end)
  }

  render () {
    const card = document.createElement('div')
    const imageWrapper = document.createElement('div')
    const image = document.createElement('img')
    const title = document.createElement('h3')
    const price = document.createElement('span')
    const conditions = document.createElement('span')
    const br = document.createElement('br')
    const deal = document.createTextNode('Por: ')
    const or = document.createTextNode('ou ')
    const interest = document.createTextNode(this.interest ? ' com juros' : ' sem juros')
    const description = document.createElement('p')
    const button = document.createElement('a')
    const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    const cart = document.createElementNS('http://www.w3.org/2000/svg', 'use')

    card.classList.add('card')
    imageWrapper.classList.add('align-center')
    title.classList.add('card__title')
    price.classList.add('card__price', 'price--big')
    conditions.classList.add('card__price', 'price--small')
    description.classList.add('card__description')
    button.classList.add('btn')
    icon.classList.add('add-cart')

    image.setAttribute('src', this.image)
    cart.setAttribute('href', 'sprite.svg#add-cart')

    title.innerText = this.name
    price.innerText = this.price
    conditions.innerText = this.conditions
    button.innerText = 'adicionar ao carrinho'

    imageWrapper.appendChild(image)

    description.appendChild(deal)
    description.appendChild(price)
    description.appendChild(br)
    description.appendChild(or)
    description.appendChild(conditions)
    description.appendChild(interest)

    icon.appendChild(cart)
    button.appendChild(icon)

    card.appendChild(imageWrapper)
    card.appendChild(title)
    card.appendChild(description)
    card.appendChild(button)

    document.getElementById(this.type).appendChild(card)
  }
}
