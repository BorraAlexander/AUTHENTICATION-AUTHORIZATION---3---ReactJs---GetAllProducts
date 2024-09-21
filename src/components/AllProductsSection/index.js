import {Component} from 'react'
import Cookies from 'js-cookie'
import ProductCard from '../ProductCard'
import './index.css'

class AllProductsSection extends Component {
  state = {
    productsList: [],
  }

  componentDidMount() {
    this.getProductsData()
  }

  getProductsData = async () => {
    const allProductsApiUrl = 'https://apis.ccbp.in/products'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(allProductsApiUrl, options)
    const data = await response.json()
    const updatedData = data.products.map(eachItem => ({
      id: eachItem.id,
      title: eachItem.title,
      brand: eachItem.brand,
      price: eachItem.price,
      imageUrl: eachItem.image_url,
      rating: eachItem.rating,
    }))

    this.setState({
      productsList: updatedData,
    })
  }

  renderProductsList = () => {
    const {productsList} = this.state
    return (
      <div>
        <h1 className="products-list-heading">All Products</h1>
        <ul className="products-list">
          {productsList.map(product => (
            <ProductCard productData={product} key={product.id} />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    return <>{this.renderProductsList()}</>
  }
}

export default AllProductsSection
