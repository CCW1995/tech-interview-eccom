import React, { useEffect, useRef } from 'react'
import { 
  Button, Card, CardBody,
  UncontrolledTooltip,
  Modal, Form, FormGroup, Input, Label
} from 'reactstrap'
import { ImPriceTag } from 'react-icons/im'
import { AiFillInfoCircle } from 'react-icons/ai'
import { BsFillCartPlusFill, BsFillCartFill } from 'react-icons/bs'

import LoadingOverlay from '../../components/LoadingOverlay'
import CartDetails from './CartDetails'
import ProductDetails from './ProductDetails'
import Pagination from '../../components/Pagination'
import ProductHOC from './action'

import { clearItem } from '../../utils/token'
import './index.scss'

function Product({
  setToken,

  currentSearchOptions,
  showCartDetails,
  userCart,
  products,
  totalPages,
  currentPage,
  productCategories,
  selectedProduct,
  loading,
  searchByName,
  searchbyCategory,

  onChangeHOC,
  getProductCategories,
  getProducts,
  getCart,
  getSelectedProduct,
  updateCart,
  removeCartItem
}) {

  const contHead = useRef( null )

  useEffect(() => {
    getProducts()
    getCart()
    getProductCategories()
  }, [])

  useEffect(() => {
    getProducts()
    contHead.current.scrollIntoView({ behaviour: 'smooth' })
  }, [ currentPage ])

  return (
    <>
      <div className="d-flex mb-3">
        <Button
          color='danger'
          style={{ marginLeft: 'auto' }}
          onClick={() => {
            clearItem( 'eccom-token' )
            clearItem( 'eccom-user-id' )
            setToken( null )
          }}
        >
          Logout
        </Button>
        <Button 
          color='primary'
          onClick={ () => onChangeHOC( 'showCartDetails', true )}
          style={{ marginLeft: 10 }}
          className={ 'd-flex align-items-center'}
        >
          {
            userCart.totalQuantity > 0 && (
              <strong style={{ marginRight: 5 }}>
              { `${ userCart.totalQuantity }`}
              </strong>
            )
          }
          <BsFillCartFill/>
        </Button>
      </div>
      <Card>
        <CardBody>
        <Form>
          <FormGroup>
            <Label>Search By</Label>
            <Input
              value={ currentSearchOptions }
              type={ 'select' }
              onChange={ e => onChangeHOC( 'currentSearchOptions', e.target.value )}
            >
              <option value=""></option>
              <option value="name">Name</option>
              <option value="category">Category</option>
            </Input>
          </FormGroup>
          {
            currentSearchOptions === 'name' && (
              <FormGroup>
                <Label>Search By Name</Label>
                <Input
                  value={ searchByName }
                  type={ 'text' }
                  onChange={ e => onChangeHOC( 'searchByName', e.target.value )}
                />
              </FormGroup>
            )
          }
          {
            currentSearchOptions === 'category' && (
              <FormGroup>
                <Label>Search By Category</Label>
                <Input
                  value={ searchbyCategory }
                  type={ 'select' }
                  onChange={ e => onChangeHOC( 'searchbyCategory', e.target.value )}
                >
                  <option value=""></option>
                  {
                    productCategories.map( catChild => (
                      <option value={ catChild } key={ catChild }>
                        { catChild }
                      </option>
                    ))
                  }
                </Input>
              </FormGroup>
            )
          }
        </Form>
        {
          currentSearchOptions && (
            <div className="d-flex">
              <Button
                color='primary'
                style={{ marginLeft: 'auto' }}
                onClick={ () => {
                  onChangeHOC( 'currentPage', 1 )
                  getProducts()
                }}
              >
                Search
              </Button>
              <Button
                color='danger'
                style={{ marginLeft: 20 }}
                onClick={ () => {
                  onChangeHOC( 'currentPage', 1 )
                  onChangeHOC( 'searchByName', '' )
                  onChangeHOC( 'searchbyCategory', '' )
                  onChangeHOC( 'currentSearchOptions', '' )
                  getProducts()
                }}
              >
                Reset
              </Button>
            </div>
          )
        }
        <hr />
        <div ref={ contHead }/>
        {
          products.products.length < 1 && (
            <span>
              No result available
            </span>
          )
        }
        {
          products.products.map( productChild => (
            <div key={ productChild.id } className="ecommerce-card">
              <span className="ecommerce-card-category badge">
                { productChild.category }
              </span>
              <Button 
                className='ecommerce-card-add-to-cart'
                color='primary'
                onClick={ () => updateCart( productChild, 'add' )}
              >
                <BsFillCartPlusFill
                  size={ 17 }
                />
              </Button>
              <Button 
                className='ecommerce-card-info'
                color='secondary'
                onClick={ () => getSelectedProduct( productChild.id )}
              >
                <AiFillInfoCircle
                  size={ 17 }
                />
              </Button>
              <img src={ productChild.thumbnail }/>
              <div className="ecommerce-card-cont">
                <div className="ecommerce-card-left-cont">
                  <p className="ecommerce-card-name" id={ `eccom_${ productChild.id }_name` }>
                    { productChild.title }
                  </p>
                  <UncontrolledTooltip target={ `eccom_${ productChild.id }_name` }>
                    { productChild.title }
                  </UncontrolledTooltip>
                </div>
                <div className="ecommerce-card-price-cont">
                  <ImPriceTag/>
                  <span>{ `RM ${ productChild.price }` }</span>
                </div>
              </div>
            </div>
          ))
        }
        <Pagination
          currentPage={ currentPage }
          totalPages={ totalPages } 
          onChangePage={ val => onChangeHOC( 'currentPage', val )}
        />
        </CardBody>
      </Card>
      <Modal isOpen={ selectedProduct !== null }>
        <ProductDetails
          onClose={ () => onChangeHOC( 'selectedProduct', null )}
          selectedProduct={ selectedProduct }
        />
      </Modal>
      <Modal isOpen={ showCartDetails }>
        <CartDetails
          onClose={ () => onChangeHOC( 'showCartDetails', false )}
          updateCart={ updateCart }
          userCart={ userCart }
          removeCartItem={ removeCartItem }
        />
      </Modal>
      {
        loading && (
          <LoadingOverlay/>
        )
      }
    </>
  )
}

export default ProductHOC( Product )