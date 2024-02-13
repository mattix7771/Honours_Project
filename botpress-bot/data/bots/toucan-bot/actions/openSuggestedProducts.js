  var axios = require('axios')

  /**
   * Open Suggested Products
   * @title OpenSuggestedProducts
   * @category Custom
   * @param {string} productType - The type of product
   * @param {string} productFilter - What to filter the product by
   */
  const myAction = async (productType, productFilter) => {
    var config = {
      method: 'get',
      url: `http://localhost:5000/products/getSpecificProduct/${productType}/${productFilter}/ASC/100`,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }
  }

  return myAction(args.productType, args.productFilter)