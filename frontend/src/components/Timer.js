import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container } from 'react-bootstrap'
import { endOfRound } from '../actions/gameActions'
import { timesUpSound, endSound } from '../assets/sounds/audio.js'

const Timer = () => {
  const dispatch = useDispatch()
  const {
    startRound,
    startModal,
    timer: { time, start },
  } = useSelector((state) => state.game)
  const [timeLeft, setTimeLeft] = useState(time)
  // const [timerFinished, setTimerFinished] = useState(false)

  useEffect(() => {
    // exit early when we reach 0
    if (!timeLeft) {
      endSound.play()
      dispatch(endOfRound())
      return
    }
    // wait for start button
    if (!start) return

    if (timeLeft === 20) {
      timesUpSound.fade(0.01, 0.25, 20000)
      timesUpSound.play()
    }

    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1)
    }, 1000)

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId)
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
  }, [timeLeft, time, start, dispatch])

  useEffect(() => {
    if (startModal) {
      setTimeLeft(time)
    }
  }, [time, startModal])

  useEffect(() => {
    if (startRound) {
      setTimeLeft(time)
    }
  }, [startRound, time])
  return (
    <Container className='timer-container'>
      <h3>Timer</h3>
      <div className='timer'>{timeLeft}</div>
    </Container>
  )
}
export default Timer
