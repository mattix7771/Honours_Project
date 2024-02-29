  var axios = require('axios')

  /**
   * Retrieve product based on parameters
   * @title GetProduct
   * @category Custom
   * @param {string} productType - The type of product
   * @param {string} productFilter - What to filter the product by
   */
  const myAction = async (productType, productFilter) => {

    // Custom API call to get products based on user's choices
    if (productFilter == 'best') {
      var config = {
        method: 'get',
        url: `http://localhost:5000/products/getSpecificProduct/${productType}/rating/DESC/price/ASC/5`,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }
    } else {
      var config = {
        method: 'get',
        url: `http://localhost:5000/products/getSpecificProduct/${productType}/${productFilter}/ASC/5`,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }
    }

    // Get producst from API response
    const response = await axios(config)
    const data = response.data

    const products = []

    data.forEach(product => {
      const item = {
        titlePayload: product.name,
        pricePayload: '£' + product.price,
        ratingPayload: product.rating,
        imagePayload: product.image,
        featuresPayload: product.features
      }
      products.push(item)
    })

    // Create carousel with products and send them to the chat
    const carouselItems = products.map(product => ({
      title: product.titlePayload.split(' ').slice(0, 1),
      subtitle: product.pricePayload,
      image: product.imagePayload
    }))

    bp.cms.renderElement('builtin_carousel', { items: carouselItems }, event).then(payloads => {
      bp.events.replyToEvent(event, payloads)
    })
  }

  return myAction(args.productType, args.productFilter)