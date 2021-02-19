import React, { Fragment } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { Jumbotron, Button } from 'react-bootstrap'
import { startTheRound } from '../actions/gameActions'

const CurrentWord = () => {
  const dispatch = useDispatch()
  const {
    wordList,
    wordIndex,
    timer: { start },
    showStartModal,
  } = useSelector((state) => state.game)

  const handleStartButton = () => {
    dispatch(startTheRound())
  }
  return (
    <Jumbotron fluid className='current-word-container'>
      {(!showStartModal && !start && (
        <Button onClick={handleStartButton}>Start</Button>
      )) ||
        (wordList.length && (
          <h1 className='current-word text-center'>
            {wordList[wordIndex].word}
          </h1>
        ))}
    </Jumbotron>
  )
}

export default CurrentWord
