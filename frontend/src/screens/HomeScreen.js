import React, { Fragment } from 'react'
import { Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

// import Meta from '../components/Meta'

const HomeScreen = ({ match }) => {
  return (
    <Fragment>
      <h1>Your new project</h1>
      <div
        className='mb-2'
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '10px',
        }}
      >
        <LinkContainer to='/login'>
          <Button
            className='homescreen-button'
            variant='primary'
            size='lg'
            width='100px'
          >
            Login
          </Button>
        </LinkContainer>
        <LinkContainer to='/register'>
          <Button className='homescreen-button' variant='secondary' size='lg'>
            Register
          </Button>
        </LinkContainer>
      </div>
    </Fragment>
  )
}

export default HomeScreen
