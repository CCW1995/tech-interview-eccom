import React, { useState } from 'react'
import { getItem } from './utils/token'
import { ToastContainer } from 'react-toastify'
import Login from './containers/Login'
import Product from './containers/Product'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [ storedToken, setToken ] = useState( getItem( 'eccom-token' ) )

  return (
    <>
      <div className="p-2">
      {
        storedToken
          ? <Product setToken={ setToken }/>
          : <Login setToken={ setToken } />
      }
      </div>
      <ToastContainer/>
    </>
  )
}

export default App