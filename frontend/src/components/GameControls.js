import React from 'react'
import { useDispatch } from 'react-redux'
import { Container, Button } from 'react-bootstrap'

import { correctWord, skipWord, previousWord } from '../actions/gameActions'

const GameControls = () => {
  const dispatch = useDispatch()

  const handleCorrectWord = () => {
    console.log('handlecorrect word')
    dispatch(correctWord())
  }

  const handleSkipWord = () => {
    dispatch(skipWord())
  }

  const handlePreviousWord = () => {
    dispatch(previousWord())
  }

  return (
    <Container className='d-flex justify-content-around'>
      <Button variant='dark' onClick={handlePreviousWord}>
        Previous
      </Button>
      <Button variant='danger' onClick={handleSkipWord}>
        Skip
      </Button>
      <Button variant='success' onClick={handleCorrectWord}>
        Correct
      </Button>
    </Container>
  )
}

export default GameControls
