import { useState } from 'react'
import { Button } from 'reactstrap'
import _ from 'lodash'

function Pagination ({
  currentPage,
  totalPages,
  onChangePage 
}) {

  const [ interval, setInterval ] = useState( 10 )

  return (
    <>
      <div className="d-flex flex-wrap pt-1" style={{ justifyContent: 'center', alignItems: 'center' }}>
        {
          totalPages.length > 0 && (
            <Button
              color="primary"
              size='sm'
              style={{ marginRight: 20 }}
              disabled={ currentPage === 1 }
              onClick={() => {
                onChangePage( currentPage - 1 )
              }}>Prev</Button>
          )
        }
        {
          interval > 10 && (
            <Button
              size='sm'
              style={{ marginRight: 20 }}
              onClick={() => setInterval( prev => ( prev -10 ))}>
              ...
            </Button>
          )
        }
        {
          totalPages.map( page => {
            if(( page > ( interval - 10 ) ) && ( page <= interval )) {
              return (
                <Button
                  key={ `Pagination-${ page }` }
                  outline 
                  size='sm'
                  className="border-0 btn-transition"
                  style={{ marginRight: 10 }}
                  color="dark"
                  onClick={() => onChangePage( page )}
                  active={ page === currentPage }>
                  { page }
                </Button>
              )
            }
          })
        }
        
        {
          ( interval < ( totalPages.length ) ) && (
            <Button
              style={{ marginLeft: 20 }}
              onClick={() => setInterval( prev => prev + 10 )}>
              ...
            </Button>
          )
        }
        {
          totalPages.length > 0 && (
            <Button
              size='sm'
              color="primary"
              style={{ marginLeft: 20 }}
              disabled={ currentPage === totalPages.length }
              onClick={() => {
                onChangePage( currentPage + 1 )
              }}>Next</Button>
          )
        }
      </div>
    </>
    )
}

export default Pagination