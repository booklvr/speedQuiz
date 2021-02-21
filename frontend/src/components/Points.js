import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const Points = () => {
  const { points } = useSelector((state) => state.game)

  useEffect(() => {})
  return (
    <Container className='points-container'>
      <h3>Points</h3>
      <div className='points'>{points}</div>
    </Container>
  )
}

export default Points
