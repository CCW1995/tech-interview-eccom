import { Component } from 'react'
import { toast } from 'react-toastify'
import _ from 'lodash'

import { fetchWithToken } from '../../utils/api'
import { getItem } from '../../utils/token'

const HOC = ( WrappedComponent ) => {
  class WithHOC extends Component {
    state = {
      products: {
        products: [],
        "total": 0,
        "skip": 0,
        "limit": 10
      },
      userCart: {
        id: 19,
        products: [],
        total: 0,
        discountedTotal: 0,
        userId: null,
        totalProducts: 0,
        totalQuantity: 0
      },
      productCategories: [],
      selectedProduct: null,
      loading: false,
      currentPage: 1,
      totalPages: [],
      showCartDetails: false,

      currentSearchOptions: '',
      searchByName: '',
      searchbyCategory: ''
    }

    requestError = error => toast.error( error )

    onChangeHOC = ( key, val ) => this.setState({ [key]: val })

    getProductCategories = () => {
      this.setState({
        loading: true 
      }, () => {
        fetchWithToken('https://dummyjson.com/products/categories')
          .then(res => res.json())
          .then( val => this.setState({ productCategories: val }))
          .catch( err => this.requestError( err ))
          .finally(() => this.setState({ loading: false }))
      })
    }

    getProducts = () => {
      this.setState({
        loading: true 
      }, () => {
        let tempUrl = `https://dummyjson.com/products${ this.state.currentSearchOptions === 'name' && this.state.searchByName ? '/search?q=phone&' : '?' }limit=10&skip=${( this.state.currentPage - 1)  * 10 }`

        if ( this.state.currentSearchOptions === 'category' && this.state.searchbyCategory ){
          tempUrl = `https://dummyjson.com/products/category/${ this.state.searchbyCategory }?limit=10&skip=${( this.state.currentPage - 1)  * 10 }`
        }
        
        fetchWithToken( tempUrl )
          .then(res => res.json())
          .then( val => {
            let tempArray = []
            let tempCeil = Math.ceil( val.total/10 )
            
            for (let index = 0; index < tempCeil; index++) {
              tempArray.push( index + 1 )
            }
    
            this.setState({ 
              products: val,
              totalPages: tempArray,
            })
          })
          .catch( err => this.requestError( err ))
          .finally(() => this.setState({ loading: false }))
      })
    }

    getSelectedProduct = id => {
      this.setState({
        loading: true 
      }, () => {
        fetchWithToken( `https://dummyjson.com/products/${ id }` )
          .then(res => res.json())
          .then( val => this.setState({ selectedProduct: val }))
          .catch( err => this.requestError( err ))
          .finally(() => this.setState({ loading: false }))
      })
    }

    getCart = () => {
      this.setState({
        loading: true 
      }, () => {
        fetchWithToken( `https://dummyjson.com/users/${ getItem( 'eccom-user-id' ) }/carts` )
          .then(res => res.json())
          .then( val => this.setState({ userCart: val.carts[0] }))
          .catch( err => this.requestError( err ))
          .finally(() => this.setState({ loading: false }))
      })
    }

    testFunction = val => {
      for (let index = 1; index <= val; index++) {
        let tempString = ``

        if ( index % 3 === 0 ){
          tempString += 'fizz'
        }

        if ( index % 5 === 0 ){
          tempString += 'buzz'
        }

        if ( !tempString ){
          console.log( index )
        } else {
          console.log( tempString )
        }

      }
    }

    removeCartItem = productID => {
      let tempCart = _.cloneDeep( this.state.userCart )
      let tempCartItemIndex = _.findIndex( this.state.userCart.products, { id: productID })
      let tempTotal = 0
      let tempTotalQuantity = 0

      tempCart.products.splice( tempCartItemIndex, 1 )

      tempCart.products.forEach( cartProduct => {
        tempTotalQuantity += cartProduct.quantity
        tempTotal += cartProduct.quantity * cartProduct.price
      });

      tempCart.total = tempTotal
      tempCart.totalQuantity = tempTotalQuantity
      tempCart.totalProducts = tempCart.products.length

      this.setState({ userCart: tempCart })
    }

    updateCart = ( product, mode ) => {
      let tempCart = _.cloneDeep( this.state.userCart )
      let tempCartItemIndex = _.findIndex( this.state.userCart.products, { id: product.id })
      let tempTotal = 0
      let tempTotalQuantity = 0

      if ( tempCartItemIndex > -1 ){
        let tempQuantity = tempCart.products[ tempCartItemIndex ].quantity

        if ( mode === 'add' ){
          tempQuantity += 1
        } else {
          tempQuantity -= 1
        }

        let tempTotal = tempQuantity * tempCart.products[ tempCartItemIndex ].price

        tempCart.products[ tempCartItemIndex ] = {
          ... tempCart.products[ tempCartItemIndex ],
          quantity: tempQuantity,
          total: tempTotal,
          discountedPrice: tempTotal * (( 100 - product.discountPercentage ) / 100 )
        }
      } else {
        tempCart.products = [
          ... tempCart.products,
          {
            id: product.id,
            title:	product.title,
            price: product.price,
            quantity: 1,
            total: product.price,
            discountPercentage: product.discountPercentage,
            discountedPrice: product.price * (( 100 - product.discountPercentage ) / 100 )
          }
        ]
      }

      tempCart.products.forEach( cartProduct => {
        tempTotalQuantity += cartProduct.quantity
        tempTotal += cartProduct.quantity * cartProduct.price
      });

      tempCart.total = tempTotal
      tempCart.totalQuantity = tempTotalQuantity
      tempCart.totalProducts = tempCart.products.length

      console.log( tempCart )
      this.setState({ userCart: tempCart })
    }


    render = () => {
      return (
        <WrappedComponent
          { ...this.props } 
          currentSearchOptions={ this.state.currentSearchOptions }
          showCartDetails={ this.state.showCartDetails }
          userCart={ this.state.userCart }
          totalPages={ this.state.totalPages }
          currentPage={ this.state.currentPage }
          products={ this.state.products }
          productCategories={ this.state.productCategories }
          selectedProduct={ this.state.selectedProduct }
          loading={ this.state.loading }
          searchByName={ this.state.searchByName }
          searchbyCategory={ this.state.searchbyCategory }

          getCart={ this.getCart }
          removeCartItem={ this.removeCartItem }
          getProductCategories={ this.getProductCategories }
          getProducts={ this.getProducts }
          updateCart={ this.updateCart }
          onChangeHOC={ this.onChangeHOC }
          getSelectedProduct={ this.getSelectedProduct }
        />
      )
    }
  }
  return WithHOC
}

export default HOC