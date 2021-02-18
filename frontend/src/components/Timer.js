import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Timer = () => {
  const {
    timer: { time, start },
  } = useSelector((state) => state.game)
  const [timeLeft, setTimeLeft] = useState(time)
  const [timerFinished, setTimerFinished] = useState(false)

  useEffect(() => {
    // exit early when we reach 0
    if (!timeLeft) {
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
  }, [timeLeft, time])
  return <div></div>
}

export default Timer
