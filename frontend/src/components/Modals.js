import React, { Fragment, useState, useEffect } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {
  closeStartModal,
  nextTeam,
  previousTeam,
  startTheRound,
} from '../actions/gameActions'

const Modals = () => {
  const dispatch = useDispatch()
  const { showStartModal, teams, teamIndex } = useSelector(
    (state) => state.game
  )
  const [startCountdown, setStartCountdown] = useState(0)

  console.log('teams', teams)
  console.log('startCountdown', startCountdown)

  const handleClose = () => {
    dispatch(closeStartModal())
  }

  const handlePreviousButton = () => {
    dispatch(previousTeam())
  }

  const handleStart = () => {
    // dispatch(startTheRound())
    setStartCountdown()
  }

  const handleNextButton = () => {
    dispatch(nextTeam())
  }
  // const handleShow = () => setShow(true)

  useEffect(() => {
    // exit early when we reach 0
    if (!startCountdown) {
      return
    }
    // // wait for start button
    // if (!start) return

    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {
      setStartCountdown(startCountdown - 1)
    }, 1000)

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId)
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
  }, [startCountdown])
  return (
    <Fragment>
      {teams.length && (
        <Modal show={showStartModal} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>{teams && teams[teamIndex].name}</Modal.Title>
          </Modal.Header>
          <Modal.Body className='text-center'>
            Are you ready? Press{' '}
            <Button variant='success' onClick={handleStart}>
              start
            </Button>{' '}
            to begin.
          </Modal.Body>
          <Modal.Footer className='d-flex justify-content-between'>
            <Button variant='secondary' onClick={handlePreviousButton}>
              previous team
            </Button>
            <Button variant='secondary' onClick={handleNextButton}>
              next team
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Fragment>
  )
}

export default Modals
