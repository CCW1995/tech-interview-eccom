import React from 'react'
import {
  ModalBody, ModalHeader,
  Card, CardBody
} from 'reactstrap'
import { ImPriceTag } from 'react-icons/im'

function ProductDetails({
  selectedProduct,
  onClose
}) {

  return (
    <>
      {
        selectedProduct && (
          <>
            <ModalHeader toggle={ () => onClose()}>
              { selectedProduct.title }
            </ModalHeader>
            <ModalBody>
              <div className="d-flex mb-3 align-items-center">
                <ImPriceTag 
                  size={ 18 } 
                  style={{ marginLeft: 'auto', marginRight: 10 }}
                />
                <h5 className='mb-0' style={{ fontWeight: 500 }}>{ `RM ${ selectedProduct.price }` }</h5>
              </div>
              <Card className='mb-2'>
                <CardBody>
                <span>
                  {
                    selectedProduct.description
                  }
                </span>
                </CardBody>
              </Card>
              {
                selectedProduct.images.map(( imageChild, imageIndex ) => (
                  <img 
                    src={ imageChild } alt={ `${ selectedProduct.title }_${ imageIndex  }`}
                    className={ 'mt-2 shadow'}
                    style={{ width: '100%', borderRadius: 10 }}
                  />
                ))
              }
            </ModalBody>
          </>
        )
      }
    </>
  )
}

export default ProductDetails