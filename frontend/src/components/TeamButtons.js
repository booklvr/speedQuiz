import React from 'react'
import { useDispatch } from 'react-redux'
import { Container, Button } from 'react-bootstrap'
import { nextTeam, previousTeam } from '../actions/gameActions'

// sounds
import { timesUpSound, nextTeamSound } from '../assets/sounds/audio.js'

const TeamButtons = () => {
  const dispatch = useDispatch()

  const handlePreviousButton = () => {
    nextTeamSound.play()
    timesUpSound.stop();
    dispatch(previousTeam())
  }

  const handleNextButton = () => {
    nextTeamSound.play()
    timesUpSound.stop();
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
