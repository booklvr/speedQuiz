import React, { Fragment, useState, useEffect } from 'react'
import { Container, Row, Col, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Teams from '../components/Teams'
import TeamButtons from '../components/TeamButtons'
import CurrentWord from '../components/CurrentWord'
import GameControls from '../components/GameControls'
import Timer from '../components/Timer'
import Points from '../components/Points'
import Modals from '../components/Modals'

// import { resetPoints } from '../actions/settingsActions'

import { loadGame } from '../actions/gameActions'

const PlayGameScreen = () => {
  const dispatch = useDispatch()
  const {
    timer: { time },
  } = useSelector((state) => state.game)

  useEffect(() => {
    // dispatch(resetPoints())
    // setShuffledWordList(() => {
    //   return shuffleArray([...wordList])
    // })
    dispatch(loadGame())
  }, [time])

  return (
    <Container fluid className='play-game-container'>
      <Modals />
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
