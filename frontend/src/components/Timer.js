import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container } from 'react-bootstrap'
import { endOfRound } from '../actions/gameActions'

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
      dispatch(endOfRound())
      return
    }
    // wait for start button
    if (!start) return

    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1)
    }, 1000)

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId)
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
  }, [timeLeft, time, start])

  useEffect(() => {
    if (startModal) {
      setTimeLeft(time)
    }
  }, [time, startModal])

  useEffect(() => {
    if (startRound) setTimeLeft(time)
  }, [startRound])
  return (
    <Container className='timer-container'>
      <h3>Timer</h3>
      <div className='timer'>{timeLeft}</div>
    </Container>
  )
}
export default Timer

{
  /* <Row className='timer'>
        <Col className='d-flex justify-content-center' md={3}>
          {Math.floor(timeLeft / 60)}
        </Col>
        <Col className='d-flex justify-content-center' md={1}>
          :
        </Col>
        <Col className='d-flex justify-content-center' md={3}>
          {(() => {
            const time = timeLeft % 60
            return time.toLocaleString(undefined, { minimumIntegerDigits: 2 })
          })()}
        </Col>
      </Row> */
}
