import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Button, Col, Row } from 'react-bootstrap'

import { correctWord, skipWord, undoWord } from '../actions/gameActions'
// import { correctSound } from '../assets/sounds/audio.js'

const GameControls = () => {
  const dispatch = useDispatch()
  const {
    skippedWords,
    correctWords,
    insideInstructionModal,
    timer: { start },
  } = useSelector((state) => state.game)

  // const correctSound = new Audio('../audio/correct.wav')
  const backSound = new Audio('../audio/back.wav')
  const skipSound = new Audio('../audio/skip.mp3')
  const correctSound = new Audio('../audio/correct.wav')

  console.log(correctSound.canplaythrough)

  const handleCorrectWord = () => {
    correctSound.play()
    console.log('readystate', correctSound.readyState)
    dispatch(correctWord())
  }

  const handleSkipWord = () => {
    skipSound.play()
    dispatch(skipWord())
  }

  const handleUndoWord = () => {
    backSound.play()
    dispatch(undoWord())
  }

  return (
    <Container
      className='game-controls-container d-flex justify-content-center'
      fluid
    >
      {(start || insideInstructionModal) && (
        <Row className='d-flex justify-content-center'>
          <Col lg={12} xl={4} className='my-2 d-flex justify-content-center'>
            <Button
              variant='dark'
              onClick={handleUndoWord}
              disabled={
                !skippedWords.length && !correctWords.length ? true : false
              }
            >
              Undo
            </Button>
          </Col>
          <Col lg={12} xl={4} className='my-2 d-flex justify-content-center'>
            <Button variant='danger' onClick={handleSkipWord}>
              Skip
            </Button>
          </Col>
          <Col lg={12} xl={4} className='my-2 d-flex justify-content-center'>
            <Button variant='success' onClick={handleCorrectWord}>
              Correct
            </Button>
          </Col>
        </Row>
      )}
    </Container>
  )
}

export default GameControls
