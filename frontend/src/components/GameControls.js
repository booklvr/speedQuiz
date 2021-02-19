import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Button } from 'react-bootstrap'

import { correctWord, skipWord, previousWord } from '../actions/gameActions'

const GameControls = () => {
  const dispatch = useDispatch()
  const { wordIndex } = useSelector((state) => state.game)

  const handleCorrectWord = () => {
    dispatch(correctWord())
  }

  const handleSkipWord = () => {
    dispatch(skipWord())
  }

  const handlePreviousWord = () => {
    dispatch(previousWord())
  }

  return (
    <Container className='game-controls-container'>
      <Button
        variant='dark'
        onClick={handlePreviousWord}
        disabled={wordIndex === 0 ? true : false}
      >
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
