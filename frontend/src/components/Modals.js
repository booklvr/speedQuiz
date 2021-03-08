import React, { Fragment, useState, useEffect } from 'react'
import {
  Modal,
  Button,
  Container,
  Row,
  Col,
  ListGroup,
  InputGroup,
  FormControl,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {
  closeStartModal,
  nextTeam,
  previousTeam,
  startTheRound,
  editRoundPointsModal,
} from '../actions/gameActions'

// sounds 
import { nextTeamSound, exitSound } from '../assets/sounds/audio.js'


const Modals = ({ insideInstructionModal }) => {
  const dispatch = useDispatch()
  const {
    showModal,
    teams,
    teamIndex,
    startModal,
    points,
    skippedWords,
    correctWords,
  } = useSelector((state) => state.game)
  const [teamPoints, setTeamPoints] = useState(points)

 

  const handleStart = () => {
    dispatch(startTheRound())
  }

  const handlePreviousButton = () => {
    nextTeamSound.play()
    dispatch(previousTeam())
  }

  const handleNextButton = () => {
    nextTeamSound.play()
    dispatch(nextTeam())
  }

  const handleClose = () => {
    exitSound.play()
    dispatch(closeStartModal())
  }
  const handleChangeTeamPoints = (e) => {
    if (isNaN(e.target.value)) return

    if (!e.target.value) {
      setTeamPoints(e.target.value)
      return
    }

    dispatch(editRoundPointsModal(+e.target.value))
  }

  useEffect(() => {
    setTeamPoints(points)
  }, [points])

  useEffect(() => {
    setTeamPoints(points)
  }, [points])
  return (
    <Fragment>
      {teams.length && (
        <Modal
          show={showModal}
          onHide={handleClose}
          centered
          backdrop='static'
          className='modal'
          size={'xl'}
        >
          <Modal.Header>
            <Modal.Title>{teams && teams[teamIndex].name}</Modal.Title>
            {startModal ? (
              <Button variant='success' onClick={handleStart}>
                Start
              </Button>
            ) : (
              <Button variant='success' onClick={handleNextButton}>
                Next Team
              </Button>
            )}
          </Modal.Header>
          <Modal.Body className='text-center'>
            {(startModal && (
              <div className='center-content'>
                <div>Are you ready?</div>

                <div>
                  Press{' '}
                  <Button variant='success' onClick={handleStart}>
                    start
                  </Button>{' '}
                  to begin.
                </div>
              </div>
            )) || (
              <Container fluid>
                <Row>
                  <Col md='3'>
                    <h4>Skipped</h4>

                    <ListGroup className='modal-word-lists'>
                      {(skippedWords.length &&
                        skippedWords.map((skippedWord) => (
                          <ListGroup.Item key={skippedWord.id}>
                            {skippedWord.word}
                          </ListGroup.Item>
                        ))) || <ListGroup.Item>0</ListGroup.Item>}
                    </ListGroup>
                  </Col>
                  <Col md='6' className='center-content'>
                    <h2>Done!</h2>
                    <InputGroup className='mb-3'>
                      <FormControl
                        value={teamPoints}
                        aria-label='points for round'
                        aria-describedby='basic-addon2'
                        onChange={(e) => handleChangeTeamPoints(e)}
                      />
                      <InputGroup.Append>
                        <InputGroup.Text id='basic-addon2'>
                          points
                        </InputGroup.Text>
                      </InputGroup.Append>
                    </InputGroup>
                    <div className='next-team-button-group'>
                      {
                        teams[
                          teamIndex + 1 < teams.length ? [teamIndex + 1] : 0
                        ].name
                      }{' '}
                      is{' '}
                      <Button variant='success' onClick={handleNextButton}>
                        next
                      </Button>
                    </div>
                  </Col>
                  <Col md='3'>
                    <h4>Correct</h4>

                    <ListGroup className='modal-word-lists'>
                      {(correctWords.length &&
                        correctWords.map((correctWord) => (
                          <ListGroup.Item key={correctWord.id}>
                            {correctWord.word}
                          </ListGroup.Item>
                        ))) || <ListGroup.Item>0</ListGroup.Item>}
                    </ListGroup>
                  </Col>
                </Row>
              </Container>
            )}
          </Modal.Body>
          <Modal.Footer className='d-flex justify-content-between'>
            <Button variant='secondary' onClick={handlePreviousButton}>
              previous team
            </Button>
            <Button variant='secondary' onClick={handleClose}>
              exit
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
