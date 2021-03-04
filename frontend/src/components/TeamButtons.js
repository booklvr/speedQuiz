import React from 'react'
import { useDispatch } from 'react-redux'
import { Container, Button } from 'react-bootstrap'
import { nextTeam, previousTeam } from '../actions/gameActions'

const TeamButtons = () => {
  const dispatch = useDispatch()

  const nextTeamSound = new Audio('../audio/next.wav')

  const handlePreviousButton = () => {
    nextTeamSound.play()
    dispatch(previousTeam())
  }

  const handleNextButton = () => {
    nextTeamSound.play()
    dispatch(nextTeam())
  }

  return (
    <Container
      fluid
      className='d-flex justify-content-between mt-3 team-buttons-container'
    >
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
