import React, { useState } from 'react'
import { 
  AiFillEyeInvisible,
  AiFillEye
} from 'react-icons/ai'
import ClipLoader from "react-spinners/ClipLoader";

import {
  Card, CardBody, CardFooter,
  Form, FormGroup, Input, Label,
  Button
} from 'reactstrap'
import { toast } from 'react-toastify'
import { storeItem } from '../utils/token'

function Login({
  setToken
}) {

  const [ showPassword, setShowPW ] = useState( false )
  const [ userName, setUsername ] = useState( 'kminchelle' )
  const [ password, setPassword ] = useState( '0lelplR' )
  const [ onLoadLogin, setLoader ] = useState( false )

  const onClickLogin = ( ) => {
    setLoader( true )

    fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        
        username: userName,
        password
      })
    })
    .then(res => res.json())
    .then( val => {
      storeItem( 'eccom-user-id', val.id )
      storeItem( 'eccom-token', val.token ) 
      setToken( val.token )
    })
    .catch( err => toast.error( err ))
    .finally(() => {
      setLoader( false )
    })
  }

  return (
    <>
      <Card>
        <CardBody>
          <Form>
            <FormGroup>
              <Label>User Name</Label>
              <Input
                value={ userName }
                disabled={ !onLoadLogin }
                onChange={ e => setUsername( e.target.value )}
              />
            </FormGroup>
            <FormGroup>
              <Label>
                Password 
                {
                  showPassword 
                    ? <AiFillEye size={ 20 }/>
                    : <AiFillEyeInvisible size={ 20 }/>
                }
              </Label>
              <Input
                disabled={ !onLoadLogin }
                value={ password }
                type={ 'password' }
                onChange={ e => setPassword( e.target.value )}
              />
            </FormGroup>
          </Form>
        </CardBody>
        <CardFooter>
          {
            onLoadLogin && (
              <ClipLoader
                size={ 30 }
              />
            )
          }
          {
            !onLoadLogin && (
              <Button onClick={ () => onClickLogin( )}>
                Login
              </Button>
            )
          }
        </CardFooter>
      </Card>
    </>
  )
}

export default Login