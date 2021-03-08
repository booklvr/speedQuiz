import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container } from 'react-bootstrap'
import { endOfRound } from '../actions/gameActions'
import { correctSound, skipSound, backSound } from '../assets/sounds/audio.js'
import {timesUpSound, endSound} from '../'

const Timer = () => {
  const dispatch = useDispatch()
  const {
    startRound,
    startModal,
    timer: { time, start },
  } = useSelector((state) => state.game)
  const [timeLeft, setTimeLeft] = useState(time)
  // const [timerFinished, setTimerFinished] = useState(false)

  if (time < 20) {
    console.log('we have a fucking problem with the time')
  }

  const outOfTimeSound = new Audio('../audio/timesUp.flac')
  outOfTimeSound.volume = 0.1
  const endSound = new Audio('../audio/end.wav')

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
      outOfTimeSound.play()
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
    if (startRound) setTimeLeft(time)
  }, [startRound, time])
  return (
    <Container className='timer-container'>
      <h3>Timer</h3>
      <div className='timer'>{timeLeft}</div>
    </Container>
  )
}
export default Timer
