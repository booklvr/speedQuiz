import React from 'react'
import { useDispatch } from 'react-redux'
import { Container, Button } from 'react-bootstrap'
import { nextTeam, previousTeam } from '../actions/gameActions'

const TeamButtons = () => {
  const dispatch = useDispatch()
  const handlePreviousButton = () => {
    dispatch(previousTeam())
  }

  const handleNextButton = () => {
    dispatch(nextTeam())
  }

  return (
    <Container fluid className='d-flex justify-content-between mt-3'>
      <Button
        className='bg-secondary bg-success'
        onClick={handlePreviousButton}
      >
        Previous Team
      </Button>
      <Button className='bg-secondary bg-success' onClick={handleNextButton}>
        Next Team
      </Button>
    </Container>
  )
}

export default TeamButtons
