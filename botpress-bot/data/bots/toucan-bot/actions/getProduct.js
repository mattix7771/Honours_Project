  var axios = require('axios')

  /**
   * Retrieve product based on parameters
   * @title GetProduct
   * @category Custom
   * @param {string} productType - The type of product
   * @param {string} productFilter - What to filter the product by
   */
  const myAction = async (productType, productFilter) => {
    var config = {
      method: 'get',
      url: `http://localhost:5000/products/getSpecificProduct/${productType}/${productFilter}/ASC`,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }

    const response = await axios(config)
    const productDetails = response.data

    temp.titlePayload = productDetails.title
    temp.pricePayload = productDetails.price
    temp.ratingPayload = productDetails.rating
    temp.imagePayload = productDetails.image
  }

  return myAction(args.productType, args.productFilter)