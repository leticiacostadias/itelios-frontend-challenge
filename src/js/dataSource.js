import Product from './productModel'
import Carousel from './carousel'
/* global XMLHttpRequest */

const fetchProducts = () => {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest()
    request.open('GET', '/data/products.json', true)

    request.onload = () => {
      if (request.status === 200) {
        resolve(JSON.parse(request.response)[0].data)
      } else {
        reject(request.statusText)
      }
    }

    request.onerror = () => {
      reject(request.statusText)
    }

    request.send()
  })
}

fetchProducts().then((response) => {
  const visited = new Product(response.item, 'visited')
  visited.render()

  response.recommendation.map((product) => {
    new Product(product, 'recommended').render()
  })

  const cycle = new Carousel() // eslint-disable-line
}).catch((error) => {
  console.error(error)
})

export default fetchProducts
