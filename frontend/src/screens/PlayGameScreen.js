import React, { useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import Teams from '../components/Teams'
import TeamButtons from '../components/TeamButtons'
import CurrentWord from '../components/CurrentWord'
import GameControls from '../components/GameControls'
import Timer from '../components/Timer'
import Points from '../components/Points'
import Modals from '../components/Modals'

// import { resetPoints } from '../actions/settingsActions'

import { loadGame } from '../actions/gameActions'

const PlayGameScreen = ({ insideInstructionModal }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadGame(insideInstructionModal))
  }, [dispatch, insideInstructionModal])

  return (
    <Container fluid className='play-game-container'>
      <Modals insideInstructionModal={insideInstructionModal} />
      <Teams />
      <TeamButtons />

      <CurrentWord />

      <Row className='justify-content-between'>
        <Col className='pr-0 mr-0'>
          <Timer />
        </Col>
        <Col
          className='d-flex justify-content-center mx-0 px-0'
          sm={12}
          md={3}
          xl={6}
        >
          <GameControls />
        </Col>
        <Col className='pl-0 ml-0'>
          <Points />
        </Col>
      </Row>
    </Container>
  )
}

export default PlayGameScreen
