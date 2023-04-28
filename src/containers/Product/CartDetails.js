import React from 'react'
import {
  ModalBody, ModalHeader,
  Button,
  Input
} from 'reactstrap'

import { FiMinus, FiPlus } from 'react-icons/fi'
import { BsFillTrash2Fill } from 'react-icons/bs'
import { ImPriceTag } from 'react-icons/im'

function CartDetails({
  userCart,
  updateCart,
  removeCartItem,

  onClose
}) {

  return (
    <>
      <ModalHeader toggle={ () => onClose()}>
        <ImPriceTag 
          size={ 18 } 
          style={{ marginRight: 10 }}
        />
        { `Total Price: RM ${ userCart.total }`}
      </ModalHeader>
      <ModalBody style={{ overflow: 'auto' }}>
        <div className="d-flex">
          <h5 style={{ marginLeft: 'auto' }}>
            { `Total Quantity: ${ userCart.totalQuantity }`}
          </h5>
        </div>
        <table className='table'>
          <thead>
            <tr>
              <th>
                Product Name
              </th>
              <th>
                Price
              </th>
              <th>
                Quantity
              </th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              userCart.products.map( productChild => (
                <tr key={ `product_row_${ productChild.id }`}>
                  <td>{ productChild.title }</td>
                  <td>{ `RM ${ productChild.price }` }</td>
                  <td>
                    <div className="d-flex">
                    <Button 
                      color={ 'primary' }
                      size={ 'sm' }
                      disabled={ productChild.quantity === 1 }
                      onClick={ () => updateCart( productChild, 'minus' )}
                    >
                      <FiMinus/>
                    </Button>
                    <Input
                      style={{ fontSize: 15, width: 70, margin: '0px 5px' }}
                      value={ productChild.quantity }
                      disabled={ true }
                      readOnly={ true }
                    />
                    <Button 
                      color={ 'primary' }
                      size={ 'sm' }
                      onClick={ () => updateCart( productChild, 'add' )}
                    >
                      <FiPlus/>
                    </Button>
                  </div>
                  </td>
                  <td>{ `RM ${ productChild.total }` }</td>
                  <td>
                    <Button 
                      color={ 'danger'}
                      onClick={ () => removeCartItem( productChild.id )}
                    >
                      <BsFillTrash2Fill/>
                    </Button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </ModalBody>
    </>
  )
}

export default CartDetails