import React, { Fragment, useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { Jumbotron, Button } from 'react-bootstrap'
import { startTheRound, startTheTimer } from '../actions/gameActions'

const CurrentWord = () => {
  const dispatch = useDispatch()
  const {
    wordList,
    wordIndex,
    timer: { start },
    showModal,
    startRound,
  } = useSelector((state) => state.game)

  const [startTimer, setStartTimer] = useState(3)

  const handleStartButton = () => {
    dispatch(startTheRound())
  }

  useEffect(() => {
    setStartTimer(3)
  }, [startRound])

  useEffect(() => {
    if (!startRound) {
      return
    }

    if (startTimer === 0) {
      setTimeout(() => {
        dispatch(startTheTimer())
      }, 1000)

      return
    }

    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {
      setStartTimer(startTimer - 1)
    }, 1000)

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId)
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
  }, [startRound, startTimer])

  return (
    <Jumbotron fluid className='current-word-container'>
      {(!showModal && !startRound && !start && (
        <Button onClick={handleStartButton}>Start</Button>
      )) ||
        (startRound && <h1 className='start-timer'>{startTimer}</h1>) ||
        (wordList.length && (
          <h1 className='current-word text-center'>
            {wordList[wordIndex].word}
          </h1>
        ))}
    </Jumbotron>
  )
}

export default CurrentWord
