import React from 'react'
import { Container } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const Points = () => {
  const { points } = useSelector((state) => state.game)
  return (
    <Container className='points-container'>
      <div className='points'>{points}</div>
    </Container>
  )
}

export default Points
